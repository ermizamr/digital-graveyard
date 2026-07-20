import os
import json
import shutil
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from sqlalchemy import desc

from database import engine, get_db, Base, DATA_DIR
import models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Digital Graveyard API")

# Ensure upload directory exists
UPLOAD_DIR = os.path.join(DATA_DIR, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount static files
# We mount /uploads for user media
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
# We mount /graveyards to serve the frontend CSS/JS/images
app.mount("/graveyards", StaticFiles(directory="graveyards"), name="static")

@app.get("/")
async def serve_frontend():
    with open("graveyards/index.html", "r", encoding="utf-8") as f:
        html = f.read()
    return HTMLResponse(content=html)

# ─── API Endpoints ───

@app.get("/api/memorials")
def get_memorials(db: Session = Depends(get_db)):
    memorials = db.query(models.Memorial).order_by(desc(models.Memorial.created_at)).all()
    result = []
    for m in memorials:
        # Load relationships
        reactions_query = db.query(models.Reaction).filter(models.Reaction.memorial_id == m.id).all()
        reactions = {r.type: r.count for r in reactions_query}
        if not reactions:
            reactions = {"candle": 0, "rose": 0, "lily": 0, "sunflower": 0, "bouquet": 0, "heart": 0}
            
        tributes = db.query(models.Tribute).filter(models.Tribute.memorial_id == m.id).order_by(desc(models.Tribute.created_at)).all()
        timelines = db.query(models.Timeline).filter(models.Timeline.memorial_id == m.id).all()
        
        # Parse tags
        try:
            tags = json.loads(m.tags)
        except:
            tags = []
            
        images = []
        if m.image_path:
            if m.image_path.startswith("http"):
                images.append(m.image_path)
            else:
                images.append(f"/uploads/{m.image_path}")
            
        result.append({
            "id": m.id,
            "name": m.name,
            "birth": m.birth_date,
            "death": m.death_date,
            "epitaph": m.epitaph,
            "bio": m.bio,
            "images": images,
            "tags": tags,
            "song": m.song,
            "location": m.location,
            "audio_url": f"/uploads/{m.audio_path}" if m.audio_path else None,
            "video_url": f"/uploads/{m.video_path}" if m.video_path else None,
            "timeline": [{"year": t.year, "event": t.event} for t in timelines],
            "reactions": reactions,
            "tributes": [{"author": t.author, "text": t.text, "time": t.created_at.strftime("%B %d, %Y")} for t in tributes]
        })
    return result

@app.post("/api/memorials")
async def create_memorial(
    name: str = Form(...),
    birth_date: str = Form(...),
    death_date: str = Form(...),
    epitaph: str = Form(""),
    bio: str = Form(...),
    tags: str = Form("[]"),
    timeline: str = Form("[]"),
    image: UploadFile = File(None),
    audio: UploadFile = File(None),
    video: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    # Save files if uploaded
    image_path = None
    if image and image.filename:
        image_path = f"img_{image.filename}"
        with open(os.path.join(UPLOAD_DIR, image_path), "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
            
    audio_path = None
    if audio and audio.filename:
        audio_path = f"aud_{audio.filename}"
        with open(os.path.join(UPLOAD_DIR, audio_path), "wb") as buffer:
            shutil.copyfileobj(audio.file, buffer)
            
    video_path = None
    if video and video.filename:
        video_path = f"vid_{video.filename}"
        with open(os.path.join(UPLOAD_DIR, video_path), "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)

    new_memorial = models.Memorial(
        name=name,
        birth_date=birth_date,
        death_date=death_date,
        epitaph=epitaph,
        bio=bio,
        tags=tags,
        image_path=image_path,
        audio_path=audio_path,
        video_path=video_path
    )
    db.add(new_memorial)
    db.commit()
    db.refresh(new_memorial)
    
    # Init default reactions
    for rtype in ["candle", "rose", "lily", "sunflower", "bouquet", "heart"]:
        db.add(models.Reaction(memorial_id=new_memorial.id, type=rtype, count=0))
        
    # Parse timeline JSON
    try:
        timeline_data = json.loads(timeline)
        for t in timeline_data:
            if t.get("year") and t.get("event"):
                db.add(models.Timeline(memorial_id=new_memorial.id, year=t["year"], event=t["event"]))
    except:
        pass
        
    db.commit()
    return {"message": "Memorial created", "id": new_memorial.id}

@app.post("/api/memorials/{memorial_id}/react")
def react_memorial(memorial_id: int, type: str = Form(...), db: Session = Depends(get_db)):
    reaction = db.query(models.Reaction).filter(
        models.Reaction.memorial_id == memorial_id,
        models.Reaction.type == type
    ).first()
    
    if not reaction:
        reaction = models.Reaction(memorial_id=memorial_id, type=type, count=1)
        db.add(reaction)
    else:
        reaction.count += 1
        
    db.commit()
    db.refresh(reaction)
    return {"message": "Reaction added", "count": reaction.count}

@app.post("/api/memorials/{memorial_id}/tribute")
def post_tribute(memorial_id: int, author: str = Form(...), text: str = Form(...), db: Session = Depends(get_db)):
    tribute = models.Tribute(memorial_id=memorial_id, author=author, text=text)
    db.add(tribute)
    db.commit()
    db.refresh(tribute)
    return {"message": "Tribute added", "author": tribute.author, "time": tribute.created_at.strftime("%B %d, %Y")}

# Seed some mock data on startup if DB is empty
@app.on_event("startup")
def seed_data():
    db = next(get_db())
    if db.query(models.Memorial).count() == 0:
        demo_data = [
            {
                "name": 'Eleanor Whitmore',
                "birth_date": '1942-03-15',
                "death_date": '2024-11-02',
                "epitaph": '"She danced through life with grace and left the world more beautiful."',
                "bio": 'Eleanor was a beloved painter, gardener, and grandmother of six. Her watercolors of the English countryside hung in galleries from London to Edinburgh. She believed that beauty was not something you find — it was something you create, one brushstroke at a time. Her laughter could fill a room and her kindness knew no bounds.',
                "image_path": 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=500&fit=crop&crop=faces',
                "tags": ['Artist', 'Grandmother', 'Gardener'],
                "song": '"La Vie en Rose" — Édith Piaf',
                "location": 'London, England',
                "timeline": [
                    { "year": '1942', "event": 'Born in Cambridge, England' },
                    { "year": '1964', "event": 'Graduated from the Royal College of Art' },
                    { "year": '1970', "event": 'First solo exhibition in London' },
                    { "year": '1988', "event": 'Awarded the Order of the British Empire for contributions to art' },
                    { "year": '2024', "event": 'Passed peacefully, surrounded by family' }
                ],
                "reactions": { "candle": 342, "rose": 128, "lily": 45, "sunflower": 12, "bouquet": 67, "heart": 201 },
                "tributes": [
                    { "author": 'James W.', "text": 'Grandma, your garden still blooms every spring. We think of you with every flower.' },
                    { "author": 'Sophie R.', "text": 'Your paintings hang in my living room. You taught me to see the world in color.' }
                ]
            },
            {
                "name": 'Marcus Chen',
                "birth_date": '1988-07-22',
                "death_date": '2025-01-18',
                "epitaph": '"A mind that never stopped exploring, a heart that never stopped caring."',
                "bio": 'Marcus was a software engineer and passionate advocate for open-source education. He spent weekends teaching coding to underprivileged youth and believed technology could be the great equalizer. His colleagues remember him for his infectious enthusiasm, his 3 AM commit messages, and his uncanny ability to debug anything with a cup of green tea in hand.',
                "image_path": 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=500&fit=crop&crop=faces',
                "tags": ['Engineer', 'Teacher', 'Open Source'],
                "song": '"Heroes" — David Bowie',
                "location": 'San Francisco, USA',
                "timeline": [
                    { "year": '1988', "event": 'Born in Taipei, Taiwan' },
                    { "year": '2010', "event": 'Graduated from Stanford University' },
                    { "year": '2015', "event": 'Founded CodeForAll — free coding workshops for youth' },
                    { "year": '2020', "event": 'Open-source project reached 10,000 contributors' },
                    { "year": '2025', "event": 'Passed suddenly; CodeForAll renamed in his honor' }
                ],
                "reactions": { "candle": 891, "rose": 234, "lily": 89, "sunflower": 156, "bouquet": 45, "heart": 678 },
                "tributes": [
                    { "author": 'Dev Community', "text": 'Your open-source contributions live on in thousands of projects worldwide.' },
                    { "author": 'Lisa M.', "text": 'You taught my daughter to code. She just got her first internship. Thank you, Marcus.' },
                    { "author": 'Raj P.', "text": 'Still using your debugging framework daily. Legend.' }
                ]
            },
            {
                "name": 'Isabelle Fontaine',
                "birth_date": '1955-12-08',
                "death_date": '2025-05-30',
                "epitaph": '"Her music was the bridge between hearts that words could never reach."',
                "bio": 'Isabelle was a concert cellist who performed with the Paris Philharmonic for over 30 years. After retiring from the stage, she opened a small music school in her hometown of Lyon, where she taught children that music was not about perfection — it was about feeling. Her rendition of Bach\'s Cello Suite No. 1 could bring an audience to tears.',
                "image_path": 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=500&fit=crop&crop=faces',
                "tags": ['Musician', 'Cellist', 'Teacher'],
                "song": '"Cello Suite No. 1" — J.S. Bach',
                "location": 'Lyon, France',
                "timeline": [
                    { "year": '1955', "event": 'Born in Lyon, France' },
                    { "year": '1975', "event": 'Joined the Paris Philharmonic Orchestra' },
                    { "year": '2005', "event": 'Retired and opened a music school in Lyon' },
                    { "year": '2025', "event": 'Passed away; school renamed Conservatoire Fontaine' }
                ],
                "reactions": { "candle": 567, "rose": 312, "lily": 156, "sunflower": 23, "bouquet": 89, "heart": 445 },
                "tributes": [
                    { "author": 'Pierre D.', "text": 'Maman, your cello still sits in the corner of the studio. Sometimes I swear I can hear it play.' },
                    { "author": 'Marie L.', "text": 'You were my first teacher. Every note I play carries a piece of you.' }
                ]
            },
            {
                "name": 'Samuel Okafor',
                "birth_date": '1970-04-03',
                "death_date": '2024-08-15',
                "epitaph": '"He built bridges — between communities, between cultures, between hearts."',
                "bio": 'Samuel was a civil engineer turned community organizer in Lagos. He led infrastructure projects that brought clean water to over 50 rural villages across Nigeria. His philosophy was simple: every person deserves dignity, and dignity starts with the basics. He was a father, a mentor, and to many, a hero who never sought the spotlight.',
                "image_path": 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=600&h=500&fit=crop&crop=faces',
                "tags": ['Engineer', 'Humanitarian', 'Father'],
                "song": '"Redemption Song" — Bob Marley',
                "location": 'Lagos, Nigeria',
                "timeline": [
                    { "year": '1970', "event": 'Born in Enugu, Nigeria' },
                    { "year": '1995', "event": 'Graduated as a civil engineer from University of Lagos' },
                    { "year": '2005', "event": 'First clean water project completed' },
                    { "year": '2018', "event": 'Milestone: 50 villages with clean water access' },
                    { "year": '2024', "event": 'Passed away; foundation continues his work' }
                ],
                "reactions": { "candle": 1203, "rose": 567, "lily": 234, "sunflower": 89, "bouquet": 345, "heart": 890 },
                "tributes": [
                    { "author": 'Amara O.', "text": 'Papa, the wells you built still bring water to our village. Your legacy flows.' },
                    { "author": 'NGO Partners', "text": 'Your vision transformed communities. We carry your mission forward.' }
                ]
            },
            {
                "name": 'Lily Hargrove',
                "birth_date": '2001-09-14',
                "death_date": '2025-03-22',
                "epitaph": '"A shooting star — brief and brilliant, lighting up every sky she crossed."',
                "bio": 'Lily was a marine biology student at UC Santa Cruz with an infectious love for ocean life. She spent her summers volunteering at marine sanctuaries and dreamed of establishing a coral reef restoration program. Despite her brief time on earth, she touched countless lives with her bright spirit, her terrible puns, and her unwavering belief that we could save the oceans.',
                "image_path": 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=500&fit=crop&crop=faces',
                "tags": ['Student', 'Marine Biologist', 'Volunteer'],
                "song": '"Somewhere Over the Rainbow" — Israel Kamakawiwoʻole',
                "location": 'Santa Cruz, USA',
                "timeline": [
                    { "year": '2001', "event": 'Born in Portland, Oregon' },
                    { "year": '2019', "event": 'Enrolled at UC Santa Cruz, Marine Biology' },
                    { "year": '2022', "event": 'Co-founded Ocean Hearts coral restoration initiative' },
                    { "year": '2025', "event": 'Passed away; scholarship established in her name' }
                ],
                "reactions": { "candle": 2104, "rose": 890, "lily": 567, "sunflower": 345, "bouquet": 234, "heart": 1567 },
                "tributes": [
                    { "author": 'Mom & Dad', "text": 'Our little mermaid. The ocean misses you as much as we do.' },
                    { "author": 'UC Santa Cruz', "text": 'The scholarship in your name will help students continue your dream.' },
                    { "author": 'Jake T.', "text": 'You made me care about the ocean. I\'m finishing what you started.' }
                ]
            },
            {
                "name": 'Arthur Brennan',
                "birth_date": '1930-01-28',
                "death_date": '2024-12-25',
                "epitaph": '"A life well-lived is the greatest story ever told."',
                "bio": 'Arthur was a World War II historian, retired schoolteacher, and beloved figure in his small Vermont community. For 40 years, he taught history not as a list of dates, but as a tapestry of human stories. Every Veteran\'s Day, he organized the town ceremony, reminding everyone that freedom is never free. He passed peacefully on Christmas morning, surrounded by family, at the age of 94.',
                "image_path": 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&h=500&fit=crop&crop=faces',
                "tags": ['Veteran', 'Teacher', 'Historian'],
                "song": '"What a Wonderful World" — Louis Armstrong',
                "location": 'Woodstock, Vermont',
                "timeline": [
                    { "year": '1930', "event": 'Born in Boston, Massachusetts' },
                    { "year": '1952', "event": 'Began teaching history at Woodstock High School' },
                    { "year": '1975', "event": 'Published "Voices of the Front" — oral histories of WWII' },
                    { "year": '1992', "event": 'Retired after 40 years of teaching' },
                    { "year": '2024', "event": 'Passed on Christmas morning, age 94' }
                ],
                "reactions": { "candle": 756, "rose": 234, "lily": 167, "sunflower": 56, "bouquet": 123, "heart": 345 },
                "tributes": [
                    { "author": 'Former Students', "text": 'Mr. Brennan made us love history. He made us love learning.' },
                    { "author": 'Town of Woodstock', "text": 'The town flag flew at half-mast. You were our heart.' }
                ]
            }
        ]

        for data in demo_data:
            m = models.Memorial(
                name=data["name"],
                birth_date=data["birth_date"],
                death_date=data["death_date"],
                epitaph=data["epitaph"],
                bio=data["bio"],
                image_path=data["image_path"],
                song=data.get("song"),
                location=data.get("location"),
                tags=json.dumps(data.get("tags", []))
            )
            db.add(m)
            db.commit()
            db.refresh(m)

            for rtype, count in data.get("reactions", {}).items():
                db.add(models.Reaction(memorial_id=m.id, type=rtype, count=count))

            for t in data.get("timeline", []):
                db.add(models.Timeline(memorial_id=m.id, year=t["year"], event=t["event"]))

            for tr in data.get("tributes", []):
                db.add(models.Tribute(memorial_id=m.id, author=tr["author"], text=tr["text"]))

            db.commit()

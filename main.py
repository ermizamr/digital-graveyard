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
        # We will create a default memorial to ensure the site isn't totally empty.
        m = models.Memorial(
            name="Eleanor Whitmore",
            birth_date="1942-03-15",
            death_date="2024-11-02",
            epitaph="She danced through life with grace and left the world more beautiful.",
            bio="Eleanor was a beloved painter, gardener, and grandmother of six. Her watercolors of the English countryside hung in galleries from London to Edinburgh.",
            tags=json.dumps(["Artist", "Grandmother", "Gardener"])
        )
        db.add(m)
        db.commit()
        db.refresh(m)
        for rtype in ["candle", "rose", "lily", "sunflower", "bouquet", "heart"]:
            db.add(models.Reaction(memorial_id=m.id, type=rtype, count=0))
        db.add(models.Timeline(memorial_id=m.id, year="1942", event="Born in Cambridge, England"))
        db.add(models.Tribute(memorial_id=m.id, author="James W.", text="Grandma, your garden still blooms every spring."))
        db.commit()

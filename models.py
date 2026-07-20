from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Memorial(Base):
    __tablename__ = "memorials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    birth_date = Column(String)
    death_date = Column(String)
    epitaph = Column(String)
    bio = Column(Text)
    song = Column(String, nullable=True)
    location = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Store JSON arrays as strings for simplicity
    tags = Column(String, default="[]") 
    
    # Media paths
    images = Column(String, default="[]")
    audio_path = Column(String, nullable=True)
    video_path = Column(String, nullable=True)
    
    timelines = relationship("Timeline", back_populates="memorial", cascade="all, delete-orphan")
    reactions = relationship("Reaction", back_populates="memorial", cascade="all, delete-orphan")
    tributes = relationship("Tribute", back_populates="memorial", cascade="all, delete-orphan")

class Timeline(Base):
    __tablename__ = "timelines"
    
    id = Column(Integer, primary_key=True, index=True)
    memorial_id = Column(Integer, ForeignKey("memorials.id"))
    year = Column(String)
    event = Column(String)
    
    memorial = relationship("Memorial", back_populates="timelines")

class Reaction(Base):
    __tablename__ = "reactions"
    
    id = Column(Integer, primary_key=True, index=True)
    memorial_id = Column(Integer, ForeignKey("memorials.id"))
    type = Column(String) # candle, rose, lily, sunflower, bouquet, heart
    count = Column(Integer, default=0)
    
    memorial = relationship("Memorial", back_populates="reactions")

class Tribute(Base):
    __tablename__ = "tributes"
    
    id = Column(Integer, primary_key=True, index=True)
    memorial_id = Column(Integer, ForeignKey("memorials.id"))
    author = Column(String)
    text = Column(Text)
    gift = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    memorial = relationship("Memorial", back_populates="tributes")

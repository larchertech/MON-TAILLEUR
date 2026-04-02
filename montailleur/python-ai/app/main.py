"""
MON TAILLEUR - AI Measurement Service
Microservice for body measurements and virtual try-on
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uvicorn

from app.routers import measurements, virtual_tryon

app = FastAPI(
    title="MON TAILLEUR AI Service",
    description="AI-powered body measurements and virtual try-on",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(measurements.router, prefix="/api/measurements", tags=["measurements"])
app.include_router(virtual_tryon.router, prefix="/api/virtual-tryon", tags=["virtual-tryon"])


class HealthResponse(BaseModel):
    status: str
    version: str
    services: List[str]


@app.get("/", response_model=HealthResponse)
async def root():
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        services=["measurements", "virtual-tryon"]
    )


@app.get("/health")
async def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

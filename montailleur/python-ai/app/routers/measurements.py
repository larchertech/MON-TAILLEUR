"""
Body Measurements Router
Handles AI-powered body measurements from images
"""

from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from pydantic import BaseModel
from typing import Optional, Dict
import base64
import io
from PIL import Image

from app.services.measurement_service import MeasurementService

router = APIRouter()
measurement_service = MeasurementService()


class MeasurementRequest(BaseModel):
    height: float  # in cm
    gender: Optional[str] = "unknown"


class MeasurementResponse(BaseModel):
    success: bool
    measurements: Dict[str, float]
    confidence: float
    method: str = "ai"


class MeasurementError(BaseModel):
    success: bool = False
    error: str


@router.post("/analyze", response_model=MeasurementResponse)
async def analyze_measurements(
    image: UploadFile = File(...),
    height: float = Form(...),
    gender: Optional[str] = Form("unknown")
):
    """
    Analyze body measurements from an image.
    
    - **image**: Full body photo (front view)
    - **height**: User's height in cm
    - **gender**: Optional gender for better accuracy
    
    Returns estimated body measurements with confidence score.
    """
    try:
        # Read image
        contents = await image.read()
        img = Image.open(io.BytesIO(contents))
        
        # Convert to RGB if necessary
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Process image
        result = await measurement_service.estimate_measurements(
            image=img,
            height_cm=height,
            gender=gender
        )
        
        return MeasurementResponse(
            success=True,
            measurements=result['measurements'],
            confidence=result['confidence'],
            method="ai"
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/analyze-base64", response_model=MeasurementResponse)
async def analyze_measurements_base64(
    image_base64: str,
    height: float,
    gender: Optional[str] = "unknown"
):
    """
    Analyze body measurements from a base64 encoded image.
    """
    try:
        # Decode base64
        image_data = base64.b64decode(image_base64)
        img = Image.open(io.BytesIO(image_data))
        
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        result = await measurement_service.estimate_measurements(
            image=img,
            height_cm=height,
            gender=gender
        )
        
        return MeasurementResponse(
            success=True,
            measurements=result['measurements'],
            confidence=result['confidence'],
            method="ai"
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/schema")
async def get_measurement_schema():
    """
    Get the schema of measurements returned by the API.
    """
    return {
        "measurements": {
            "height": {"unit": "cm", "description": "Full height"},
            "chest": {"unit": "cm", "description": "Chest circumference"},
            "waist": {"unit": "cm", "description": "Waist circumference"},
            "hips": {"unit": "cm", "description": "Hip circumference"},
            "shoulders": {"unit": "cm", "description": "Shoulder width"},
            "arm_length": {"unit": "cm", "description": "Arm length"},
            "inseam": {"unit": "cm", "description": "Inner leg length"},
            "neck": {"unit": "cm", "description": "Neck circumference"},
            "sleeve_length": {"unit": "cm", "description": "Sleeve length"},
            "thigh": {"unit": "cm", "description": "Thigh circumference"},
            "calf": {"unit": "cm", "description": "Calf circumference"},
        }
    }

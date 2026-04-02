"""
Body Measurement Service
Uses MediaPipe and computer vision to estimate body measurements
"""

import cv2
import numpy as np
from PIL import Image
import mediapipe as mp
from typing import Dict, Tuple, Optional


class MeasurementService:
    """Service for estimating body measurements from images."""
    
    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(
            static_image_mode=True,
            model_complexity=2,
            enable_segmentation=True,
            min_detection_confidence=0.5
        )
        
        # Body ratios based on anthropometric data
        self.body_ratios = {
            'male': {
                'chest_to_height': 0.52,
                'waist_to_height': 0.43,
                'hips_to_height': 0.53,
                'shoulders_to_height': 0.26,
                'arm_to_height': 0.36,
                'inseam_to_height': 0.45,
                'neck_to_height': 0.19,
                'sleeve_to_height': 0.33,
                'thigh_to_height': 0.28,
                'calf_to_height': 0.19,
            },
            'female': {
                'chest_to_height': 0.50,
                'waist_to_height': 0.38,
                'hips_to_height': 0.55,
                'shoulders_to_height': 0.24,
                'arm_to_height': 0.35,
                'inseam_to_height': 0.44,
                'neck_to_height': 0.18,
                'sleeve_to_height': 0.32,
                'thigh_to_height': 0.29,
                'calf_to_height': 0.18,
            }
        }
    
    async def estimate_measurements(
        self, 
        image: Image.Image, 
        height_cm: float,
        gender: str = "unknown"
    ) -> Dict:
        """
        Estimate body measurements from an image.
        
        Args:
            image: PIL Image of the person
            height_cm: Known height in cm
            gender: 'male', 'female', or 'unknown'
        
        Returns:
            Dictionary with measurements and confidence score
        """
        # Convert PIL to OpenCV format
        img_array = np.array(image)
        img_cv = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
        
        # Detect pose
        results = self.pose.process(img_array)
        
        if not results.pose_landmarks:
            raise ValueError("Could not detect body in image. Please ensure full body is visible.")
        
        # Get landmarks
        landmarks = results.pose_landmarks.landmark
        
        # Calculate pixel-to-cm ratio
        pixel_height = self._calculate_pixel_height(landmarks, img_array.shape)
        pixel_to_cm = height_cm / pixel_height
        
        # Determine gender ratios
        if gender == "unknown":
            # Use average of male and female ratios
            ratios = {
                k: (self.body_ratios['male'][k] + self.body_ratios['female'][k]) / 2
                for k in self.body_ratios['male']
            }
        else:
            ratios = self.body_ratios.get(gender, self.body_ratios['male'])
        
        # Calculate measurements
        measurements = {
            'height': round(height_cm, 1),
            'chest': round(height_cm * ratios['chest_to_height'], 1),
            'waist': round(height_cm * ratios['waist_to_height'], 1),
            'hips': round(height_cm * ratios['hips_to_height'], 1),
            'shoulders': round(height_cm * ratios['shoulders_to_height'], 1),
            'arm_length': round(height_cm * ratios['arm_to_height'], 1),
            'inseam': round(height_cm * ratios['inseam_to_height'], 1),
            'neck': round(height_cm * ratios['neck_to_height'], 1),
            'sleeve_length': round(height_cm * ratios['sleeve_to_height'], 1),
            'thigh': round(height_cm * ratios['thigh_to_height'], 1),
            'calf': round(height_cm * ratios['calf_to_height'], 1),
        }
        
        # Calculate confidence based on pose detection quality
        confidence = self._calculate_confidence(landmarks, img_array.shape)
        
        return {
            'measurements': measurements,
            'confidence': round(confidence, 2),
            'landmarks_detected': len(landmarks)
        }
    
    def _calculate_pixel_height(
        self, 
        landmarks, 
        image_shape: Tuple[int, int, int]
    ) -> float:
        """Calculate height in pixels from landmarks."""
        h, w = image_shape[:2]
        
        # Get top of head (approximate using nose y position)
        nose_y = landmarks[self.mp_pose.PoseLandmark.NOSE].y * h
        
        # Get bottom of feet
        left_ankle_y = landmarks[self.mp_pose.PoseLandmark.LEFT_ANKLE].y * h
        right_ankle_y = landmarks[self.mp_pose.PoseLandmark.RIGHT_ANKLE].y * h
        
        # Use the lowest ankle
        feet_y = max(left_ankle_y, right_ankle_y)
        
        return feet_y - nose_y
    
    def _calculate_confidence(
        self, 
        landmarks, 
        image_shape: Tuple[int, int, int]
    ) -> float:
        """Calculate confidence score based on landmark visibility."""
        visible_landmarks = 0
        total_landmarks = len(landmarks)
        
        for landmark in landmarks:
            # Check if landmark is visible (visibility > 0.5)
            if landmark.visibility > 0.5:
                visible_landmarks += 1
        
        # Base confidence on visibility ratio
        visibility_ratio = visible_landmarks / total_landmarks
        
        # Adjust confidence based on key landmarks
        key_landmarks = [
            self.mp_pose.PoseLandmark.NOSE,
            self.mp_pose.PoseLandmark.LEFT_SHOULDER,
            self.mp_pose.PoseLandmark.RIGHT_SHOULDER,
            self.mp_pose.PoseLandmark.LEFT_HIP,
            self.mp_pose.PoseLandmark.RIGHT_HIP,
            self.mp_pose.PoseLandmark.LEFT_ANKLE,
            self.mp_pose.PoseLandmark.RIGHT_ANKLE,
        ]
        
        key_visible = sum(
            1 for lm in key_landmarks 
            if landmarks[lm].visibility > 0.5
        )
        
        key_ratio = key_visible / len(key_landmarks)
        
        # Combined confidence (weighted average)
        confidence = (visibility_ratio * 0.4 + key_ratio * 0.6) * 100
        
        return min(confidence, 99.9)  # Cap at 99.9%

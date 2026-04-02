from fastapi import APIRouter
from app.schemas.patient import PatientCreate
from app.services import patient_service

router = APIRouter()

@router.post("/")
def create_patient(patient: PatientCreate):
    return patient_service.create_patient(patient)
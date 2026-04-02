from fastapi import APIRouter
from app.schemas.patient import PatientCreate
from app.services import patient_service

router = APIRouter()

@router.post("/")
def create_patient(patient: PatientCreate):
    return patient_service.create_patient(patient)

@router.get("/")
def get_patients():
    return patient_service.get_all_patients()

@router.get("/by-phone/{phone}")
def get_patient_by_phone(phone: str):
    return patient_service.get_patient_by_phone(phone)

@router.get("/by-id/{patient_id}")
def get_patient(patient_id: int):
    return patient_service.get_patient_by_id(patient_id)
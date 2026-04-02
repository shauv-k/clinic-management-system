from fastapi import APIRouter
from app.schemas.appointment import AppointmentCreate
from app.services import appointment_service

router = APIRouter()

@router.post("/")
def create_appointment(data: AppointmentCreate):
    return appointment_service.create_appointment(data)
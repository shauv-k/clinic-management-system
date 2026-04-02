from fastapi import APIRouter, HTTPException
from app.schemas.appointment import AppointmentCreate
from app.services import appointment_service

router = APIRouter(prefix="/appointments", tags=["Appointments"])


# CREATE
@router.post("/")
def create_appointment(data: AppointmentCreate):
    try:
        return appointment_service.create_appointment(data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# GET ALL
@router.get("/")
def get_all():
    try:
        return appointment_service.get_all_appointments()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# GET BY DOCTOR
@router.get("/by-doctor/{doctor_id}")
def get_by_doctor(doctor_id: int):
    try:
        return appointment_service.get_appointments_by_doctor(doctor_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# GET BY PATIENT
@router.get("/by-patient/{patient_id}")
def get_by_patient(patient_id: int):
    try:
        return appointment_service.get_appointments_by_patient(patient_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# UPDATE STATUS
@router.patch("/{appointment_id}/status")
def update_status(appointment_id: int, status: str):
    try:
        return appointment_service.update_appointment_status(
            appointment_id,
            status
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
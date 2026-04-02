from fastapi import APIRouter
from app.db import get_connection
from app.schemas.patient import PatientCreate

router = APIRouter()

@router.post("/")
def create_patient(patient: PatientCreate):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO PATIENT (patient_id, name, gender, phone)
        VALUES (patient_seq.NEXTVAL, :1, :2, :3)
    """, (patient.name, patient.gender, patient.phone))

    conn.commit()
    return {"message": "Patient created"}
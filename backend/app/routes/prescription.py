from fastapi import APIRouter
from app.db import get_connection

router = APIRouter()

@router.post("/")
def add_prescription(appointment_id: int, medication_id: int, dosage: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO PRESCRIPTION 
        (prescription_id, appointment_id, medication_id, dosage)
        VALUES (presc_seq.NEXTVAL, :1, :2, :3)
    """, (appointment_id, medication_id, dosage))

    conn.commit()
    return {"message": "Prescription added"}
from fastapi import APIRouter
from app.db import get_connection
from app.schemas.appointment import AppointmentCreate

router = APIRouter()

@router.post("/")
def book_appointment(appt: AppointmentCreate):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO APPOINTMENT 
        (appointment_id, patient_id, doctor_id, appointment_datetime)
        VALUES (
            appt_seq.NEXTVAL,
            :1,
            :2,
            TO_TIMESTAMP(:3, 'YYYY-MM-DD HH24:MI:SS')
        )
    """, (appt.patient_id, appt.doctor_id, appt.appointment_datetime))

    conn.commit()
    return {"message": "Appointment booked"}
from app.db import get_connection

def create_appointment(data):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO APPOINTMENT (
            appointment_id,
            patient_id,
            doctor_id,
            appointment_datetime,
            status
        )
        VALUES (
            appointment_seq.NEXTVAL,
            :1,
            :2,
            :3,
            'SCHEDULED'
        )
    """, (
        data.patient_id,
        data.doctor_id,
        data.appointment_datetime
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "Appointment booked"}
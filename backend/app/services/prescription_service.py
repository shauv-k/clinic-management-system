from app.db import get_connection


def create_prescription(data):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO PRESCRIPTION (
                prescription_id,
                appointment_id,
                medication_id,
                dosage,
                frequency,
                duration
            )
            VALUES (
                prescription_seq.NEXTVAL,
                :1, :2, :3, :4, :5
            )
        """, (
            data.appointment_id,
            data.medication_id,
            data.dosage,
            data.frequency,
            data.duration
        ))

        conn.commit()

    finally:
        cursor.close()
        conn.close()


def get_prescriptions_by_appointment(appointment_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT
                prescription_id,
                appointment_id,
                medication_id,
                dosage,
                frequency,
                duration
            FROM PRESCRIPTION
            WHERE appointment_id = :1
        """, (appointment_id,))

        rows = cursor.fetchall()

        return [
            {
                "prescription_id": r[0],
                "appointment_id": r[1],
                "medication_id": r[2],
                "dosage": r[3],
                "frequency": r[4],
                "duration": r[5],
            }
            for r in rows
        ]

    finally:
        cursor.close()
        conn.close()
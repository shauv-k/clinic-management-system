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
                p.prescription_id,
                p.appointment_id,
                p.medication_id,
                m.name AS medication_name,
                p.dosage,
                p.frequency,
                p.duration
            FROM PRESCRIPTION p
            JOIN MEDICATION m
                ON p.medication_id = m.medication_id
            WHERE p.appointment_id = :1
        """, (appointment_id,))

        rows = cursor.fetchall()

        return [
            {
                "prescription_id": r[0],
                "appointment_id": r[1],
                "medication_id": r[2],
                "medication_name": r[3],
                "dosage": r[4],
                "frequency": r[5],
                "duration": r[6],
            }
            for r in rows
        ]

    finally:
        cursor.close()
        conn.close()
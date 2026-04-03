from app.db import get_connection


def create_medical_record(data):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO MEDICAL_RECORD (
                record_id,
                appointment_id,
                symptoms,
                diagnosis,
                treatment
            )
            VALUES (
                record_seq.NEXTVAL,
                :1, :2, :3, :4
            )
        """, (
            data.appointment_id,
            data.symptoms,
            data.diagnosis,
            data.treatment
        ))

        conn.commit()

    finally:
        cursor.close()
        conn.close()


def get_medical_record_by_appointment(appointment_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT
                record_id,
                appointment_id,
                symptoms,
                diagnosis,
                treatment
            FROM MEDICAL_RECORD
            WHERE appointment_id = :1
        """, (appointment_id,))

        row = cursor.fetchone()

        if not row:
            return None

        return {
            "record_id": row[0],
            "appointment_id": row[1],
            "symptoms": row[2],
            "diagnosis": row[3],
            "treatment": row[4],
        }

    finally:
        cursor.close()
        conn.close()
from app.db import get_connection
import oracledb

VALID_STATUS = {"SCHEDULED", "COMPLETED", "CANCELLED", "NO_SHOW"}


# -------------------------------
# CREATE APPOINTMENT
# -------------------------------
def create_appointment(data):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        if data.status not in VALID_STATUS:
            raise Exception("Invalid status")

        cursor.execute("""
            INSERT INTO APPOINTMENT (
                appointment_id,
                patient_id,
                doctor_id,
                appointment_datetime,
                status
            ) VALUES (
                appointment_seq.NEXTVAL,
                :patient_id,
                :doctor_id,
                :appointment_datetime,
                :status
            )
        """, {
            "patient_id": data.patient_id,
            "doctor_id": data.doctor_id,
            "appointment_datetime": data.appointment_datetime,
            "status": data.status
        })

        conn.commit()

        return {"message": "Appointment created successfully"}

    except oracledb.IntegrityError as e:
        error_msg = str(e)

        if "unique_doctor_slot" in error_msg:
            raise Exception("Doctor already has an appointment at this time")

        if "ORA-02291" in error_msg:
            raise Exception("Invalid patient_id or doctor_id")

        if "-20001" in error_msg:
            raise Exception("15-minute gap rule violated")

        raise Exception("Database constraint error")

    finally:
        cursor.close()
        conn.close()


# -------------------------------
# GET ALL
# -------------------------------
def get_all_appointments():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT appointment_id, patient_id, doctor_id,
               appointment_datetime, status
        FROM APPOINTMENT
        ORDER BY appointment_datetime
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "appointment_id": r[0],
            "patient_id": r[1],
            "doctor_id": r[2],
            "appointment_datetime": r[3],
            "status": r[4],
        }
        for r in rows
    ]


# -------------------------------
# GET BY DOCTOR
# -------------------------------
def get_appointments_by_doctor(doctor_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT appointment_id, patient_id, doctor_id,
               appointment_datetime, status
        FROM APPOINTMENT
        WHERE doctor_id = :doctor_id
        ORDER BY appointment_datetime
    """, {"doctor_id": doctor_id})

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "appointment_id": r[0],
            "patient_id": r[1],
            "doctor_id": r[2],
            "appointment_datetime": r[3],
            "status": r[4],
        }
        for r in rows
    ]


# -------------------------------
# GET BY PATIENT
# -------------------------------
def get_appointments_by_patient(patient_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT appointment_id, patient_id, doctor_id,
               appointment_datetime, status
        FROM APPOINTMENT
        WHERE patient_id = :patient_id
        ORDER BY appointment_datetime
    """, {"patient_id": patient_id})

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "appointment_id": r[0],
            "patient_id": r[1],
            "doctor_id": r[2],
            "appointment_datetime": r[3],
            "status": r[4],
        }
        for r in rows
    ]


# -------------------------------
# UPDATE STATUS
# -------------------------------
def update_appointment_status(appointment_id: int, status: str):
    conn = get_connection()
    cursor = conn.cursor()

    if status not in VALID_STATUS:
        raise Exception("Invalid status")

    cursor.execute("""
        UPDATE APPOINTMENT
        SET status = :status
        WHERE appointment_id = :id
    """, {
        "status": status,
        "id": appointment_id
    })

    if cursor.rowcount == 0:
        raise Exception("Appointment not found")

    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "Status updated successfully"}
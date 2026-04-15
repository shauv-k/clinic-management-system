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
        # get sequence value first
        cursor.execute("SELECT appointment_seq.NEXTVAL FROM dual")
        appointment_id = cursor.fetchone()[0]

        cursor.execute("""
            INSERT INTO APPOINTMENT (
                appointment_id,
                patient_id,
                doctor_id,
                appointment_datetime,
                status
            ) VALUES (
                :appointment_id,
                :patient_id,
                :doctor_id,
                :appointment_datetime,
                :status
            )
        """, {
            "appointment_id": appointment_id,
            "patient_id": data.patient_id,
            "doctor_id": data.doctor_id,
            "appointment_datetime": data.appointment_datetime,
            "status": data.status
        })

        conn.commit()

        return {
            "message": "Appointment created successfully",
            "appointment_id": appointment_id
        }

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
        SELECT 
            a.appointment_id,

            p.patient_id,
            p.name,

            d.staff_id,
            s.name,

            dept.name,

            a.appointment_datetime,
            a.status

        FROM APPOINTMENT a

        JOIN PATIENT p
            ON a.patient_id = p.patient_id

        JOIN DOCTOR d
            ON a.doctor_id = d.staff_id

        JOIN STAFF s
            ON d.staff_id = s.staff_id

        LEFT JOIN DEPARTMENT dept
            ON s.department_id = dept.department_id

        ORDER BY a.appointment_datetime
    """)

    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    return [
        {
            "appointment_id": r[0],
            "patient_id": r[1],
            "patient_name": r[2],
            "doctor_id": r[3],
            "doctor_name": r[4],
            "department": r[5],
            "appointment_datetime": r[6],
            "status": r[7],
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
        SELECT 
            a.appointment_id,

            p.patient_id,
            p.name,

            d.staff_id,
            s.name,

            dept.name,

            a.appointment_datetime,
            a.status

        FROM APPOINTMENT a

        JOIN PATIENT p
            ON a.patient_id = p.patient_id

        JOIN DOCTOR d
            ON a.doctor_id = d.staff_id

        JOIN STAFF s
            ON d.staff_id = s.staff_id

        LEFT JOIN DEPARTMENT dept
            ON s.department_id = dept.department_id

        WHERE d.staff_id = :doctor_id

        ORDER BY a.appointment_datetime
    """, {"doctor_id": doctor_id})

    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    return [
        {
            "appointment_id": r[0],
            "patient_id": r[1],
            "patient_name": r[2],
            "doctor_id": r[3],
            "doctor_name": r[4],
            "department": r[5],
            "appointment_datetime": r[6],
            "status": r[7],
        }
        for r in rows
    ]

# -------------------------------
# GET BY PATIENT
# -------------------------------
def get_appointments_by_patient_phone(phone: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT 
            a.appointment_id,

            p.patient_id,
            p.name,

            d.staff_id AS doctor_id,
            s.name AS doctor_name,

            dept.name AS department,

            a.appointment_datetime,
            a.status

        FROM APPOINTMENT a

        JOIN PATIENT p
            ON a.patient_id = p.patient_id

        JOIN DOCTOR d
            ON a.doctor_id = d.staff_id

        JOIN STAFF s
            ON d.staff_id = s.staff_id

        LEFT JOIN DEPARTMENT dept
            ON s.department_id = dept.department_id

        WHERE p.phone = :phone

        ORDER BY a.appointment_datetime
    """, {"phone": phone})

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "appointment_id": r[0],
            "patient_id": r[1],
            "patient_name": r[2],
            "doctor_id": r[3],
            "doctor_name": r[4],
            "department": r[5],
            "appointment_datetime": r[6],
            "status": r[7],
        }
        for r in rows
    ]

# -------------------------------
# UPDATE STATUS
# -------------------------------
def update_appointment_status(appointment_id: int, status: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE APPOINTMENT
        SET status = :status
        WHERE appointment_id = :id
    """, {
        "status": status,
        "id": appointment_id
    })

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise Exception("Appointment not found")

    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "Status updated successfully"}
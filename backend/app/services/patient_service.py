from app.db import get_connection

def create_patient(patient):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO PATIENT (
            patient_id,
            name,
            gender,
            dob,
            phone,
            address
        )
        VALUES (
            patient_seq.NEXTVAL,
            :1,
            :2,
            :3,
            :4,
            :5
        )
    """, (
        patient.name,
        patient.gender,
        patient.dob,
        patient.phone,
        patient.address
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "Patient created"}

def get_all_patients():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT patient_id, name, gender, dob, phone, address
        FROM PATIENT
        ORDER BY patient_id
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    patients = []
    for row in rows:
        patients.append({
            "patient_id": row[0],
            "name": row[1],
            "gender": row[2],
            "dob": row[3],
            "phone": row[4],
            "address": row[5]
        })

    return patients

def get_patient_by_phone(phone: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT patient_id, name, gender, dob, phone, address
        FROM PATIENT
        WHERE phone = :1
    """, (phone,))

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        return {"error": "Patient not found"}

    return {
        "patient_id": row[0],
        "name": row[1],
        "gender": row[2],
        "dob": row[3],
        "phone": row[4],
        "address": row[5]
    }

def get_patient_by_id(patient_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT patient_id, name, gender, dob, phone, address
        FROM PATIENT
        WHERE patient_id = :1
    """, (patient_id,))

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        return {"error": "Patient not found"}

    return {
        "patient_id": row[0],
        "name": row[1],
        "gender": row[2],
        "dob": row[3],
        "phone": row[4],
        "address": row[5]
    }
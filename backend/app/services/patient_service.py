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
from app.db import get_connection


# -------------------------------
# GET DOCTORS BY DEPARTMENT ID
# -------------------------------
def get_doctors_by_department(department_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT d.staff_id AS doctor_id,
               s.name,
               d.specialization
        FROM DOCTOR d
        JOIN STAFF s ON d.staff_id = s.staff_id
        WHERE s.department_id = :department_id
        ORDER BY s.name
    """, {"department_id": department_id})

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "doctor_id": r[0],
            "name": r[1],
            "specialization": r[2],
        }
        for r in rows
    ]

# -------------------------------
# GET DOCTORS BY DEPARTMENT NAME
# -------------------------------
def get_doctors_by_department_name(department_name: str):
    conn = get_connection()
    cursor = conn.cursor()

    # Step 1: get department_id
    cursor.execute("""
        SELECT department_id
        FROM DEPARTMENT
        WHERE LOWER(name) = LOWER(:name)
    """, {"name": department_name})

    dept = cursor.fetchone()

    if not dept:
        cursor.close()
        conn.close()
        raise Exception("Department not found")

    department_id = dept[0]

    # Step 2: fetch doctors
    cursor.execute("""
        SELECT d.staff_id AS doctor_id,
               s.name,
               d.specialization
        FROM DOCTOR d
        JOIN STAFF s ON d.staff_id = s.staff_id
        WHERE s.department_id = :department_id
        ORDER BY s.name
    """, {"department_id": department_id})

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "doctor_id": r[0],
            "name": r[1],
            "specialization": r[2]
        }
        for r in rows
    ]
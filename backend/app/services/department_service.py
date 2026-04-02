from app.db import get_connection


# -------------------------------
# GET ALL DEPARTMENTS
# -------------------------------
def get_all_departments():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT department_id, name
        FROM DEPARTMENT
        ORDER BY name
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "department_id": r[0],
            "name": r[1]
        }
        for r in rows
    ]
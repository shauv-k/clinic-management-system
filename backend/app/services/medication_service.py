from app.db import get_connection


def get_all_medications():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT medication_id, name
            FROM MEDICATION
            ORDER BY name
        """)

        rows = cursor.fetchall()

        return [
            {
                "medication_id": r[0],
                "name": r[1],
            }
            for r in rows
        ]

    finally:
        cursor.close()
        conn.close()


def search_medications(name: str):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT medication_id, name
            FROM MEDICATION
            WHERE LOWER(name) LIKE LOWER(:1)
            ORDER BY name
        """, (f"%{name}%",))

        rows = cursor.fetchall()

        return [
            {
                "medication_id": r[0],
                "name": r[1],
            }
            for r in rows
        ]

    finally:
        cursor.close()
        conn.close()
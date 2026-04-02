from app.db import get_connection

try:
    conn = get_connection()
    cursor = conn.cursor()

    # simplest query (always works in Oracle)
    cursor.execute("SELECT 1 FROM DUAL")

    result = cursor.fetchone()
    print("Connection successful:", result)

    conn.close()

except Exception as e:
    print("Connection failed:", e)
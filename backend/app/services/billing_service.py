from app.db import get_connection


def create_bill(data):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO BILLING (
                bill_id,
                appointment_id,
                amount,
                payment_mode
            )
            VALUES (
                bill_seq.NEXTVAL,
                :1, :2, :3
            )
        """, (
            data.appointment_id,
            data.amount,
            data.payment_mode
        ))

        conn.commit()

    finally:
        cursor.close()
        conn.close()


def get_bill_by_appointment(appointment_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT
                bill_id,
                appointment_id,
                amount,
                payment_mode,
                payment_status
            FROM BILLING
            WHERE appointment_id = :1
        """, (appointment_id,))

        row = cursor.fetchone()

        if not row:
            return None

        return {
            "bill_id": row[0],
            "appointment_id": row[1],
            "amount": row[2],
            "payment_mode": row[3],
            "payment_status": row[4],
        }

    finally:
        cursor.close()
        conn.close()


def update_payment_mode(appointment_id: int, mode: str | None):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            UPDATE BILLING
            SET payment_mode = :1
            WHERE appointment_id = :2
        """, (mode, appointment_id))

        if cursor.rowcount == 0:
            return False

        conn.commit()
        return True

    finally:
        cursor.close()
        conn.close()
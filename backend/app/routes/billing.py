from fastapi import APIRouter
from app.db import get_connection

router = APIRouter()

@router.get("/")
def get_billing():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM BILLING")
    rows = cursor.fetchall()

    return {"data": rows}
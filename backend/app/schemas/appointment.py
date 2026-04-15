from pydantic import BaseModel
from datetime import datetime
from typing import Literal


# -------------------------------
# CREATE INPUT
# -------------------------------
class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    appointment_datetime: datetime
    status: Literal["SCHEDULED", "COMPLETED", "CANCELLED", "NO_SHOW"]


# -------------------------------
# OUTPUT
# -------------------------------
class AppointmentOut(BaseModel):
    appointment_id: int

    patient_id: int
    patient_name: str

    doctor_id: int
    doctor_name: str

    department: str | None

    appointment_datetime: datetime
    status: str

    class Config:
        from_attributes = True


# -------------------------------
# CREATE RESPONSE
# -------------------------------
class AppointmentCreateResponse(BaseModel):
    message: str
    appointment_id: int


# -------------------------------
# UPDATE STATUS INPUT
# -------------------------------
class AppointmentStatusUpdate(BaseModel):
    status: Literal["SCHEDULED", "COMPLETED", "CANCELLED", "NO_SHOW"]
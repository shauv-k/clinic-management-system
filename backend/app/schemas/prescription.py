from pydantic import BaseModel


class PrescriptionCreate(BaseModel):
    appointment_id: int
    medication_id: int
    dosage: str
    frequency: str
    duration: str


class PrescriptionOut(BaseModel):
    prescription_id: int
    appointment_id: int
    medication_id: int
    dosage: str
    frequency: str
    duration: str
from pydantic import BaseModel

class MedicalRecordCreate(BaseModel):
    appointment_id: int
    symptoms: str
    diagnosis: str
    treatment: str


class MedicalRecordOut(BaseModel):
    record_id: int
    appointment_id: int
    symptoms: str
    diagnosis: str
    treatment: str
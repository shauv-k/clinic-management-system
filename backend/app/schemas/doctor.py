from pydantic import BaseModel

class DoctorOut(BaseModel):
    doctor_id: int
    name: str
    specialization: str

    class Config:
        from_attributes = True
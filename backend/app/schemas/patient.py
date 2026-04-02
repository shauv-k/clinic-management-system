from pydantic import BaseModel, Field
from datetime import date

class PatientCreate(BaseModel):
    name: str = Field(..., max_length=100)
    gender: str = Field(..., pattern="^(Male|Female|Other)$")
    dob: date
    phone: str = Field(..., min_length=10, max_length=15)
    address: str = Field(..., max_length=200)
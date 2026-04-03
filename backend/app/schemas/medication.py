from pydantic import BaseModel

class MedicationOut(BaseModel):
    medication_id: int
    name: str
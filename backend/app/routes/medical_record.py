from fastapi import APIRouter, HTTPException
from app.schemas.medical_record import MedicalRecordCreate
from app.services import medical_record_service as mrs

router = APIRouter(
    prefix="/medical-record",
    tags=["Medical Record"]
)


@router.post("")
def create_record(payload: MedicalRecordCreate):
    try:
        mrs.create_medical_record(payload)
        return {"message": "Medical record created"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{appointment_id}")
def get_record(appointment_id: int):
    record = mrs.get_medical_record_by_appointment(appointment_id)

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Medical record not found"
        )

    return record
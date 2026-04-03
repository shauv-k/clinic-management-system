from fastapi import APIRouter, HTTPException
from app.schemas.prescription import PrescriptionCreate
from app.services import prescription_service as prs

router = APIRouter(
    prefix="/prescriptions",
    tags=["Prescriptions"]
)


@router.post("")
def create_prescription(payload: PrescriptionCreate):
    try:
        prs.create_prescription(payload)
        return {"message": "Prescription added"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{appointment_id}")
def get_prescriptions(appointment_id: int):
    return prs.get_prescriptions_by_appointment(appointment_id)
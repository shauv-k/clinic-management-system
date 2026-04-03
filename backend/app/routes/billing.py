from fastapi import APIRouter, HTTPException
from app.schemas.billing import BillingCreate
from app.services import billing_service as bs

router = APIRouter(
    prefix="/billing",
    tags=["Billing"]
)


@router.post("")
def create_bill(payload: BillingCreate):
    try:
        bs.create_bill(payload)
        return {"message": "Bill created"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{appointment_id}")
def get_bill(appointment_id: int):
    bill = bs.get_bill_by_appointment(appointment_id)

    if not bill:
        raise HTTPException(
            status_code=404,
            detail="Bill not found"
        )

    return bill


@router.patch("/{appointment_id}")
def update_payment_mode(appointment_id: int, mode: str | None = None):
    updated = bs.update_payment_mode(appointment_id, mode)

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Bill not found"
        )

    return {"message": "Payment updated"}
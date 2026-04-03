from pydantic import BaseModel


class BillingCreate(BaseModel):
    appointment_id: int
    amount: float
    payment_mode: str | None   # NULL = unpaid


class BillingOut(BaseModel):
    bill_id: int
    appointment_id: int
    amount: float
    payment_mode: str | None
    payment_status: str
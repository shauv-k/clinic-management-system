from fastapi import APIRouter
from app.services import medication_service as ms

router = APIRouter(
    prefix="/medications",
    tags=["Medications"]
)


@router.get("")
def get_all_medications():
    return ms.get_all_medications()


@router.get("/search")
def search_medications(name: str):
    return ms.search_medications(name)
from fastapi import APIRouter, HTTPException
from app.services import department_service

router = APIRouter(prefix="/departments", tags=["Departments"])

# -------------------------------
# GET ALL DEPARTMENTS
# -------------------------------
@router.get("/")
def get_departments():
    try:
        data = department_service.get_all_departments()

        if not data:
            return {"message": "No departments found"}

        return data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
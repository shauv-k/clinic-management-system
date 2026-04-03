from fastapi import APIRouter, HTTPException
from app.services import doctor_service

router = APIRouter(prefix="/doctors", tags=["Doctors"])


@router.get("/by-department-id/{department_id}")
def get_by_department(department_id: int):
    try:
        data = doctor_service.get_doctors_by_department(department_id)

        if not data:
            return {"message": "No doctors found for this department"}

        return data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/by-department-name/{department_name}")
def get_by_department_name(department_name: str):
    try:
        data = doctor_service.get_doctors_by_department_name(department_name)

        if not data:
            return {"message": "No doctors found for this department"}

        return data

    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
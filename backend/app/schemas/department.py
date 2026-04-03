from pydantic import BaseModel

class DepartmentOut(BaseModel):
    department_id: int
    name: str

    class Config:
        from_attributes = True
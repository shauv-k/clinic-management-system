from fastapi import FastAPI
from app.routes import patient, appointment, department, doctor

app = FastAPI()

app.include_router(patient.router)
app.include_router(appointment.router)
app.include_router(department.router)
app.include_router(doctor.router)

@app.get("/")
def root():
    return {"message": "Clinic API running"}
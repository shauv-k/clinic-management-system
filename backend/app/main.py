from fastapi import FastAPI
from app.routes import patient, appointment

app = FastAPI()

app.include_router(patient.router, prefix="/patients")
app.include_router(appointment.router, prefix="/appointments")

@app.get("/")
def root():
    return {"message": "Clinic API running"}
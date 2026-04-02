from fastapi import FastAPI
from app.routes import patient, appointment, billing, prescription

app = FastAPI()

app.include_router(patient.router, prefix="/patients", tags=["Patients"])
app.include_router(appointment.router, prefix="/appointments", tags=["Appointments"])
app.include_router(billing.router, prefix="/billing", tags=["Billing"])
app.include_router(prescription.router, prefix="/prescriptions", tags=["Prescription"])
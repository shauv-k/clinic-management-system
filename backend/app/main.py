from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import patient, appointment, department, doctor, medical_record, medication, prescription, billing

app = FastAPI()

# ✅ FIXED CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patient.router)
app.include_router(appointment.router)
app.include_router(department.router)
app.include_router(doctor.router)
app.include_router(medical_record.router)
app.include_router(medication.router)
app.include_router(prescription.router)
app.include_router(billing.router)

@app.get("/")
def root():
    return {"message": "Clinic API running"}
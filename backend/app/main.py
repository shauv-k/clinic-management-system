from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import patient, appointment, department, doctor

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patient.router)
app.include_router(appointment.router)
app.include_router(department.router)
app.include_router(doctor.router)

@app.get("/")
def root():
    return {"message": "Clinic API running"}
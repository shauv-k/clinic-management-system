-- PATIENT
CREATE TABLE PATIENT (
    patient_id NUMBER PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    gender VARCHAR2(10),
    dob DATE,
    phone VARCHAR2(15) UNIQUE,
    address VARCHAR2(200)
);

-- DEPARTMENT
CREATE TABLE DEPARTMENT (
    department_id NUMBER PRIMARY KEY,
    name VARCHAR2(100) UNIQUE NOT NULL,
    head_doctor_id NUMBER UNIQUE
);

-- STAFF
CREATE TABLE STAFF (
    staff_id NUMBER PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    phone VARCHAR2(15),
    department_id NUMBER,
    FOREIGN KEY (department_id)
        REFERENCES DEPARTMENT(department_id)
);

-- DOCTOR
CREATE TABLE DOCTOR (
    staff_id NUMBER PRIMARY KEY,
    specialization VARCHAR2(100),
    qualifications VARCHAR2(200),
    FOREIGN KEY (staff_id)
        REFERENCES STAFF(staff_id)
);

-- NON CLINICAL STAFF
CREATE TABLE NON_CLINICAL_STAFF (
    staff_id NUMBER PRIMARY KEY,
    role VARCHAR2(100),
    FOREIGN KEY (staff_id)
        REFERENCES STAFF(staff_id)
);

-- APPOINTMENT
CREATE TABLE APPOINTMENT (
    appointment_id NUMBER PRIMARY KEY,
    patient_id NUMBER,
    doctor_id NUMBER,
    appointment_datetime TIMESTAMP,
    status VARCHAR2(20),

    FOREIGN KEY (patient_id)
        REFERENCES PATIENT(patient_id),

    FOREIGN KEY (doctor_id)
        REFERENCES DOCTOR(staff_id),

    CONSTRAINT unique_doctor_slot
        UNIQUE (doctor_id, appointment_datetime)
);

-- MEDICAL RECORD
CREATE TABLE MEDICAL_RECORD (
    record_id NUMBER PRIMARY KEY,
    appointment_id NUMBER UNIQUE,
    symptoms VARCHAR2(500),
    diagnosis VARCHAR2(500),
    treatment VARCHAR2(500),
    FOREIGN KEY (appointment_id)
        REFERENCES APPOINTMENT(appointment_id)
);

-- BILLING
CREATE TABLE BILLING (
    bill_id NUMBER PRIMARY KEY,
    appointment_id NUMBER UNIQUE,
    amount NUMBER(10,2),
    payment_mode VARCHAR2(50),
    payment_status VARCHAR2(20),
    FOREIGN KEY (appointment_id)
        REFERENCES APPOINTMENT(appointment_id)
);

-- MEDICATION
CREATE TABLE MEDICATION (
    medication_id NUMBER PRIMARY KEY,
    name VARCHAR2(100) NOT NULL
);

-- PRESCRIPTION
CREATE TABLE PRESCRIPTION (
    prescription_id NUMBER PRIMARY KEY,
    appointment_id NUMBER,
    medication_id NUMBER,
    dosage VARCHAR2(50),
    frequency VARCHAR2(50),
    duration VARCHAR2(50),

    FOREIGN KEY (appointment_id)
        REFERENCES APPOINTMENT(appointment_id),

    FOREIGN KEY (medication_id)
        REFERENCES MEDICATION(medication_id)
);
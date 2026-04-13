-- Departments
INSERT INTO DEPARTMENT VALUES (department_seq.NEXTVAL, 'Cardiology', NULL);
INSERT INTO DEPARTMENT VALUES (department_seq.NEXTVAL, 'Neurology', NULL);
INSERT INTO DEPARTMENT VALUES (department_seq.NEXTVAL, 'Orthopedics', NULL);
INSERT INTO DEPARTMENT VALUES (department_seq.NEXTVAL, 'Pediatrics', NULL);
INSERT INTO DEPARTMENT VALUES (department_seq.NEXTVAL, 'Dermatology', NULL);

-- Staff
-- Cardiology (1)
INSERT INTO STAFF VALUES (staff_seq.NEXTVAL, 'Dr. A Sharma', '1111111111', 1);
INSERT INTO STAFF VALUES (staff_seq.NEXTVAL, 'Nurse Kiran', '2222222222', 1);

-- Neurology (2)
INSERT INTO STAFF VALUES (staff_seq.NEXTVAL, 'Dr. Mehta', '3333333333', 2);
INSERT INTO STAFF VALUES (staff_seq.NEXTVAL, 'Admin Ravi', '4444444444', 2);

-- Orthopedics (3)
INSERT INTO STAFF VALUES (staff_seq.NEXTVAL, 'Dr. Singh', '5555555555', 3);

-- Pediatrics (4)
INSERT INTO STAFF VALUES (staff_seq.NEXTVAL, 'Dr. Nair', '6666666666', 4);

-- Dermatology (5)
INSERT INTO STAFF VALUES (staff_seq.NEXTVAL, 'Dr. Patel', '7777777777', 5);

-- Doctors
INSERT INTO DOCTOR VALUES (1, 'Cardiologist', 'MD Cardiology');
INSERT INTO DOCTOR VALUES (3, 'Neurologist', 'MD Neurology');
INSERT INTO DOCTOR VALUES (5, 'Orthopedic', 'MS Ortho');
INSERT INTO DOCTOR VALUES (6, 'Pediatrician', 'MD Pediatrics');
INSERT INTO DOCTOR VALUES (7, 'Dermatologist', 'MD Dermatology');


INSERT INTO NON_CLINICAL_STAFF VALUES (2, 'Nurse');
INSERT INTO NON_CLINICAL_STAFF VALUES (4, 'Receptionist');

-- Set head doctors
UPDATE DEPARTMENT SET head_doctor_id = 1 WHERE department_id = 1;
UPDATE DEPARTMENT SET head_doctor_id = 3 WHERE department_id = 2;
UPDATE DEPARTMENT SET head_doctor_id = 5 WHERE department_id = 3;
UPDATE DEPARTMENT SET head_doctor_id = 6 WHERE department_id = 4;
UPDATE DEPARTMENT SET head_doctor_id = 7 WHERE department_id = 5;


-- Patients
INSERT INTO PATIENT VALUES (patient_seq.NEXTVAL, 'Rahul Verma', 'Male', DATE '1995-05-10', '9000000001', 'Mumbai');
INSERT INTO PATIENT VALUES (patient_seq.NEXTVAL, 'Sneha Iyer', 'Female', DATE '1998-07-21', '9000000002', 'Mumbai');
INSERT INTO PATIENT VALUES (patient_seq.NEXTVAL, 'Amit Das', 'Male', DATE '1985-03-15', '9000000003', 'Pune');
INSERT INTO PATIENT VALUES (patient_seq.NEXTVAL, 'Neha Kapoor', 'Female', DATE '2000-11-02', '9000000004', 'Delhi');
INSERT INTO PATIENT VALUES (patient_seq.NEXTVAL, 'Rohan Shah', 'Male', DATE '1992-09-09', '9000000005', 'Ahmedabad');



-- Appointments
INSERT INTO APPOINTMENT VALUES (appointment_seq.NEXTVAL, 1, 1, TIMESTAMP '2026-04-15 10:00:00', 'SCHEDULED');
INSERT INTO APPOINTMENT VALUES (appointment_seq.NEXTVAL, 2, 1, TIMESTAMP '2026-04-15 10:20:00', 'SCHEDULED');
INSERT INTO APPOINTMENT VALUES (appointment_seq.NEXTVAL, 3, 3, TIMESTAMP '2026-04-15 11:00:00', 'SCHEDULED');
INSERT INTO APPOINTMENT VALUES (appointment_seq.NEXTVAL, 4, 5, TIMESTAMP '2026-04-15 12:00:00', 'SCHEDULED');
INSERT INTO APPOINTMENT VALUES (appointment_seq.NEXTVAL, 5, 6, TIMESTAMP '2026-04-15 13:00:00', 'SCHEDULED');


-- Medical Records
INSERT INTO MEDICAL_RECORD VALUES (record_seq.NEXTVAL, 1, 'Chest pain', 'Mild angina', 'Medication');
INSERT INTO MEDICAL_RECORD VALUES (record_seq.NEXTVAL, 2, 'Headache', 'Migraine', 'Painkillers');
INSERT INTO MEDICAL_RECORD VALUES (record_seq.NEXTVAL, 3, 'Back pain', 'Muscle strain', 'Physiotherapy');
INSERT INTO MEDICAL_RECORD VALUES (record_seq.NEXTVAL, 4, 'Skin rash', 'Allergy', 'Ointment');
INSERT INTO MEDICAL_RECORD VALUES (record_seq.NEXTVAL, 5, 'Fever', 'Viral infection', 'Rest');


-- Medication
INSERT INTO MEDICATION VALUES (medication_seq.NEXTVAL, 'Paracetamol');
INSERT INTO MEDICATION VALUES (medication_seq.NEXTVAL, 'Ibuprofen');
INSERT INTO MEDICATION VALUES (medication_seq.NEXTVAL, 'Amoxicillin');
INSERT INTO MEDICATION VALUES (medication_seq.NEXTVAL, 'Cetirizine');
INSERT INTO MEDICATION VALUES (medication_seq.NEXTVAL, 'Aspirin');


-- Prescriptions
INSERT INTO PRESCRIPTION VALUES (prescription_seq.NEXTVAL, 1, 1, '500mg', 'Twice a day', '5 days');
INSERT INTO PRESCRIPTION VALUES (prescription_seq.NEXTVAL, 2, 2, '400mg', 'Once a day', '3 days');
INSERT INTO PRESCRIPTION VALUES (prescription_seq.NEXTVAL, 3, 3, '250mg', 'Thrice a day', '7 days');
INSERT INTO PRESCRIPTION VALUES (prescription_seq.NEXTVAL, 4, 4, '10mg', 'Once daily', '5 days');
INSERT INTO PRESCRIPTION VALUES (prescription_seq.NEXTVAL, 5, 5, '75mg', 'Once daily', '10 days');


-- Billing
INSERT INTO BILLING VALUES (bill_seq.NEXTVAL, 1, 500.00, NULL, NULL);
INSERT INTO BILLING VALUES (bill_seq.NEXTVAL, 2, 800.00, NULL, NULL);
INSERT INTO BILLING VALUES (bill_seq.NEXTVAL, 3, 1200.00, NULL, NULL);
INSERT INTO BILLING VALUES (bill_seq.NEXTVAL, 4, 600.00, NULL, NULL);
INSERT INTO BILLING VALUES (bill_seq.NEXTVAL, 5, 700.00, NULL, NULL);
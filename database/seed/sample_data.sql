-- Departments
INSERT INTO DEPARTMENT VALUES (1, 'Cardiology', NULL);
INSERT INTO DEPARTMENT VALUES (2, 'Neurology', NULL);

-- Staff
INSERT INTO STAFF VALUES (1, 'Dr. Sharma', '9999999999', 1);
INSERT INTO STAFF VALUES (2, 'Dr. Mehta', '8888888888', 2);

-- Doctors
INSERT INTO DOCTOR VALUES (1, 'Cardiologist', 'MD');
INSERT INTO DOCTOR VALUES (2, 'Neurologist', 'MD');

-- Set head doctors
UPDATE DEPARTMENT SET head_doctor_id = 1 WHERE department_id = 1;
UPDATE DEPARTMENT SET head_doctor_id = 2 WHERE department_id = 2;

-- Patients
INSERT INTO PATIENT VALUES (1, 'Rahul', 'M', DATE '2000-01-01', '7777777777', 'Pune');

-- Medication
INSERT INTO MEDICATION VALUES (1, 'Paracetamol');
INSERT INTO MEDICATION VALUES (2, 'Ibuprofen');
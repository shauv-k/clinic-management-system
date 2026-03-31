-- Head doctor FK (added later due to circular dependency)
ALTER TABLE DEPARTMENT
ADD CONSTRAINT fk_head_doctor
FOREIGN KEY (head_doctor_id)
REFERENCES DOCTOR(staff_id);

-- Payment status check
ALTER TABLE BILLING
ADD CONSTRAINT chk_payment_status
CHECK (payment_status IN ('PAID', 'PENDING'));
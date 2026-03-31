CREATE OR REPLACE TRIGGER trg_validate_head_doctor
BEFORE INSERT OR UPDATE ON DEPARTMENT
FOR EACH ROW
DECLARE
    v_dept_id NUMBER;
BEGIN
    IF :NEW.head_doctor_id IS NOT NULL THEN

        SELECT department_id INTO v_dept_id
        FROM STAFF
        WHERE staff_id = :NEW.head_doctor_id;

        IF v_dept_id != :NEW.department_id THEN
            RAISE_APPLICATION_ERROR(-20002,
            'Head doctor must belong to the same department.');
        END IF;

    END IF;
END;
/
CREATE OR REPLACE TRIGGER trg_prevent_double_booking
BEFORE INSERT OR UPDATE ON APPOINTMENT
FOR EACH ROW
DECLARE
    v_count NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_count
    FROM APPOINTMENT
    WHERE doctor_id = :NEW.doctor_id
      AND ABS(
            (CAST(appointment_datetime AS DATE) -
             CAST(:NEW.appointment_datetime AS DATE)) * 24 * 60
          ) < 15
      AND appointment_id != NVL(:NEW.appointment_id, -1);

    IF v_count > 0 THEN
        RAISE_APPLICATION_ERROR(-20001,
        'Doctor must have at least 15 minutes gap between appointments.');
    END IF;
END;
/
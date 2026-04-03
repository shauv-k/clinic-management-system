CREATE OR REPLACE TRIGGER trg_auto_payment_status
BEFORE INSERT OR UPDATE ON BILLING
FOR EACH ROW
BEGIN
    IF :NEW.payment_mode IS NULL THEN
        :NEW.payment_status := 'PENDING';
    ELSE
        :NEW.payment_status := 'PAID';
    END IF;
END;
/
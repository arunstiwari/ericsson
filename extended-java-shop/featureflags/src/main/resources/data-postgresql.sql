-- Ensure the Adaptive Pricing Flag is added when the schema is created
INSERT INTO flag(flag_id, name, portion_in, sticky) VALUES (1, 'adaptive-pricing', 50, TRUE)

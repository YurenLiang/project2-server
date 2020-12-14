DROP TABLE IF EXISTS tracker;

CREATE TABLE tracker (
 id SERIAL PRIMARY KEY,
 year INT,
 month INT,
 day INT,
 calories_gain INT,
 calories_gain_description TEXT,
 calories_burn INT,
 calories_burn_description TEXT,
 is_deleted INT DEFAULT 0
);

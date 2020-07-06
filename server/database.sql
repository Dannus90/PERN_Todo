CREATE DATABASE perntodo;


-- Unique ID
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
)
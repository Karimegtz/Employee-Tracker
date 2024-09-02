\c ecotrackers

DROP DATABASE IF EXISTS team_members;
CREATE DATABASE team_members;

\c team_members

CREATE TABLE division (
  division_id SERIAL PRIMARY KEY,
  division_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE job (
  job_id SERIAL PRIMARY KEY,
  job_title VARCHAR(30) UNIQUE NOT NULL,
  job_salary DECIMAL NOT NULL,
  division_id INTEGER NOT NULL,
  CONSTRAINT fk_division FOREIGN KEY (division_id) REFERENCES division(division_id) ON DELETE CASCADE
);

CREATE TABLE employee (
  employee_id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  job_id INTEGER NOT NULL,
  CONSTRAINT fk_job FOREIGN KEY (job_id) REFERENCES job(job_id) ON DELETE CASCADE,
  supervisor_id INTEGER,
  CONSTRAINT fk_supervisor FOREIGN KEY (supervisor_id) REFERENCES employee(employee_id) ON DELETE SET NULL
);

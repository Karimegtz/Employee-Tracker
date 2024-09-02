
\c team_members

INSERT INTO division
    (division_name)
VALUES
    ('Marketing'),
    ('Product Development'),
    ('Human Resources'),
    ('Compliance');

INSERT INTO job
    (job_title, job_salary, division_id)
VALUES
    ('Marketing Director', 95000, 1),
    ('Marketing Coordinator', 55000, 1),
    ('Product Manager', 105000, 2),
    ('UX Designer', 75000, 2),
    ('HR Manager', 85000, 3),
    ('Recruiter', 60000, 3),
    ('Compliance Officer', 70000, 4),
    ('Legal Advisor', 90000, 4);

INSERT INTO employee
    (first_name, last_name, job_id, supervisor_id)
VALUES
    ('Alice', 'Johnson', 1, NULL),
    ('Bob', 'Smith', 2, 1),
    ('Charlie', 'Davis', 3, NULL),
    ('Diana', 'Evans', 4, 3),
    ('Eve', 'Martinez', 5, NULL),
    ('Frank', 'Clark', 6, 5),
    ('Grace', 'Taylor', 7, NULL),
    ('Henry', 'Anderson', 8, 7);

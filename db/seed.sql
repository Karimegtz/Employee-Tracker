INSERT INTO division
    (division_name)
VALUES
    ('Marketing'),
    ('Product Development'),
    ('Human Resources'),
    ('Compliance');

INSERT INTO position
    (position_title, salary, division_id)
VALUES
    ('Marketing Director', 85000, 1),
    ('Marketing Coordinator', 45000, 1),
    ('Product Manager', 95000, 2),
    ('UX Designer', 72000, 2),
    ('HR Manager', 78000, 3),
    ('Recruiter', 52000, 3),
    ('Compliance Officer', 65000, 4),
    ('Legal Advisor', 70000, 4);

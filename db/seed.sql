\c team_members

INSERT INTO division
    (division_name)
VALUES
    ('Marketing'),
    ('Research & Development'),
    ('Human Capital'),
    ('Regulatory Affairs');

INSERT INTO job
    (job_title, job_salary, division_id)
VALUES
    ('Head of Marketing', 85000, 1),
    ('Marketing Associate', 45000, 1),
    ('Product Owner', 95000, 2),
    ('User Experience Designer', 72000, 2),
    ('Human Capital Manager', 78000, 3),
    ('Talent Acquisition Specialist', 52000, 3),
    ('Regulatory Compliance Specialist', 65000, 4),
    ('Corporate Legal Counsel', 70000, 4);

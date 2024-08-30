\c employees

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 65765, 1),
    ('Salesperson', 56756, 1),
    ('Lead Engineer', 15788, 2),
    ('Software Engineer', 454654, 2),
    ('Account Manager', 87686, 3),
    ('Accountant', 47657575, 3),
    ('Legal Team Lead', 65767567, 4),
    ('Lawyer', 45777, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('flavio', 'mtx', 1, NULL),
    ('Alondra', 'rda', 2, 1),
    ('Chuy', 'perez', 3, NULL),
    ('Ilemda    ', 'Glx', 4, 3),
    ('Sofi', 'Torres', 5, NULL),
    ('Josema', 'Cortes', 6, 5),
    ('Pedro', 'Gtz', 7, NULL),
    ('Mari', 'Heredia', 8, 7);

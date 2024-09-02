const account = require('./connection');

class Database {
  constructor() {}

  async executeQuery(sql, args = []) {
    const client = await account.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } finally {
      client.release();
    }
  }

  getAllEmployees() {
    return this.executeQuery(
      "SELECT employee.employee_id, employee.first_name, employee.last_name, job.job_title, division.division_name AS division, job.job_salary, CONCAT(supervisor.first_name, ' ', supervisor.last_name) AS supervisor FROM employee LEFT JOIN job on employee.job_id = job.job_id LEFT JOIN division on job.division_id = division.division_id LEFT JOIN employee supervisor on supervisor.employee_id = employee.supervisor_id;"
    );
  }

  getAllPossibleSupervisors(employeeId) {
    return this.executeQuery(
      'SELECT employee_id, first_name, last_name FROM employee WHERE employee_id != $1',
      [employeeId]
    );
  }

  addEmployee(employee) {
    const { first_name, last_name, job_id, supervisor_id } = employee;
    return this.executeQuery(
      'INSERT INTO employee (first_name, last_name, job_id, supervisor_id) VALUES ($1, $2, $3, $4)',
      [first_name, last_name, job_id, supervisor_id]
    );
  }

  deleteEmployee(employeeId) {
    return this.executeQuery('DELETE FROM employee WHERE employee_id = $1', [employeeId]);
  }

  updateEmployeeJob(employeeId, jobId) {
    return this.executeQuery('UPDATE employee SET job_id = $1 WHERE employee_id = $2', [
      jobId,
      employeeId,
    ]);
  }

  updateEmployeeSupervisor(employeeId, supervisorId) {
    return this.executeQuery('UPDATE employee SET supervisor_id = $1 WHERE employee_id = $2', [
      supervisorId,
      employeeId,
    ]);
  }

  getAllJobs() {
    return this.executeQuery(
      'SELECT job.job_id, job.job_title, division.division_name AS division, job.job_salary FROM job LEFT JOIN division on job.division_id = division.division_id;'
    );
  }

  addJob(job) {
    const { job_title, job_salary, division_id } = job;
    return this.executeQuery(
      'INSERT INTO job (job_title, job_salary, division_id) VALUES ($1, $2, $3)',
      [job_title, job_salary, division_id]
    );
  }

  deleteJob(jobId) {
    return this.executeQuery('DELETE FROM job WHERE job_id = $1', [jobId]);
  }

  getAllDivisions() {
    return this.executeQuery('SELECT division.division_id, division.division_name FROM division;');
  }

  viewDivisionBudgets() {
    return this.executeQuery(
      'SELECT division.division_id, division.division_name, SUM(job.job_salary) AS utilized_budget FROM employee LEFT JOIN job on employee.job_id = job.job_id LEFT JOIN division on job.division_id = division.division_id GROUP BY division.division_id, division.division_name;'
    );
  }

  addDivision(division) {
    return this.executeQuery('INSERT INTO division (division_name) VALUES ($1)', [
      division.division_name,
    ]);
  }

  deleteDivision(divisionId) {
    return this.executeQuery('DELETE FROM division WHERE division_id = $1', [divisionId]);
  }

  getAllEmployeesByDivision(divisionId) {
    return this.executeQuery(
      'SELECT employee.employee_id, employee.first_name, employee.last_name, job.job_title FROM employee LEFT JOIN job on employee.job_id = job.job_id LEFT JOIN division division on job.division_id = division.division_id WHERE division.division_id = $1;',
      [divisionId]
    );
  }

  getAllEmployeesBySupervisor(supervisorId) {
    return this.executeQuery(
      'SELECT employee.employee_id, employee.first_name, employee.last_name, division.division_name AS division, job.job_title FROM employee LEFT JOIN job on job.job_id = employee.job_id LEFT JOIN division ON division.division_id = job.division_id WHERE supervisor_id = $1;',
      [supervisorId]
    );
  }
}

module.exports = new Database();

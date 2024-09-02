const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db');

init();

function init() {
  const logoText = logo({ name: 'Team Member Manager' }).render();
  console.log(logoText);
  loadMainPrompts();
}

function loadMainPrompts() {
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What action would you like to perform?',
      choices: [
        {
          name: 'View All Team Members',
          value: 'VIEW_TEAM_MEMBERS',
        },
        {
          name: 'View Team Members by Division',
          value: 'VIEW_TEAM_MEMBERS_BY_DIVISION',
        },
        {
          name: 'View Team Members by Supervisor',
          value: 'VIEW_TEAM_MEMBERS_BY_SUPERVISOR',
        },
        {
          name: 'Add New Team Member',
          value: 'ADD_TEAM_MEMBER',
        },
        {
          name: 'Remove Team Member',
          value: 'REMOVE_TEAM_MEMBER',
        },
        {
          name: 'Update Team Member Job',
          value: 'UPDATE_TEAM_MEMBER_JOB',
        },
        {
          name: 'Update Team Member Supervisor',
          value: 'UPDATE_TEAM_MEMBER_SUPERVISOR',
        },
        {
          name: 'View All Jobs',
          value: 'VIEW_JOBS',
        },
        {
          name: 'Add New Job',
          value: 'ADD_JOB',
        },
        {
          name: 'Remove Job',
          value: 'REMOVE_JOB',
        },
        {
          name: 'View All Divisions',
          value: 'VIEW_DIVISIONS',
        },
        {
          name: 'Add New Division',
          value: 'ADD_DIVISION',
        },
        {
          name: 'Remove Division',
          value: 'REMOVE_DIVISION',
        },
        {
          name: 'View Total Budget by Division',
          value: 'VIEW_BUDGET_BY_DIVISION',
        },
        {
          name: 'Exit',
          value: 'QUIT',
        },
      ],
    },
  ]).then((res) => {
    let action = res.action;
    switch (action) {
      case 'VIEW_TEAM_MEMBERS':
        viewTeamMembers();
        break;
      case 'VIEW_TEAM_MEMBERS_BY_DIVISION':
        viewTeamMembersByDivision();
        break;
      case 'VIEW_TEAM_MEMBERS_BY_SUPERVISOR':
        viewTeamMembersBySupervisor();
        break;
      case 'ADD_TEAM_MEMBER':
        addTeamMember();
        break;
      case 'REMOVE_TEAM_MEMBER':
        removeTeamMember();
        break;
      case 'UPDATE_TEAM_MEMBER_JOB':
        updateTeamMemberJob();
        break;
      case 'UPDATE_TEAM_MEMBER_SUPERVISOR':
        updateTeamMemberSupervisor();
        break;
      case 'VIEW_JOBS':
        viewJobs();
        break;
      case 'ADD_JOB':
        addJob();
        break;
      case 'REMOVE_JOB':
        removeJob();
        break;
      case 'VIEW_DIVISIONS':
        viewDivisions();
        break;
      case 'ADD_DIVISION':
        addDivision();
        break;
      case 'REMOVE_DIVISION':
        removeDivision();
        break;
      case 'VIEW_BUDGET_BY_DIVISION':
        viewBudgetByDivision();
        break;
      default:
        quit();
    }
  });
}

function viewTeamMembers() {
  db.getAllEmployees()
    .then(({ rows }) => {
      let teamMembers = rows;
      console.log('\n');
      console.table(teamMembers);
    })
    .then(() => loadMainPrompts());
}

function viewTeamMembersByDivision() {
  db.getAllDivisions().then(({ rows }) => {
    let divisions = rows;
    const divisionChoices = divisions.map(({ division_id, division_name }) => ({
      name: division_name,
      value: division_id,
    }));

    prompt([
      {
        type: 'list',
        name: 'divisionId',
        message: 'Select a division to view its team members:',
        choices: divisionChoices,
      },
    ])
      .then((res) => db.getAllEmployeesByDivision(res.divisionId))
      .then(({ rows }) => {
        let teamMembers = rows;
        console.log('\n');
        console.table(teamMembers);
      })
      .then(() => loadMainPrompts());
  });
}

function viewTeamMembersBySupervisor() {
  db.getAllEmployees().then(({ rows }) => {
    let supervisors = rows;
    const supervisorChoices = supervisors.map(({ employee_id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: employee_id,
    }));

    prompt([
      {
        type: 'list',
        name: 'supervisorId',
        message: 'Select a supervisor to view their direct reports:',
        choices: supervisorChoices,
      },
    ])
      .then((res) => db.getAllEmployeesBySupervisor(res.supervisorId))
      .then(({ rows }) => {
        let teamMembers = rows;
        console.log('\n');
        if (teamMembers.length === 0) {
          console.log('The selected supervisor has no direct reports.');
        } else {
          console.table(teamMembers);
        }
      })
      .then(() => loadMainPrompts());
  });
}

function addTeamMember() {
  prompt([
    {
      name: 'first_name',
      message: "Enter the team member's first name:",
    },
    {
      name: 'last_name',
      message: "Enter the team member's last name:",
    },
  ]).then((res) => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.getAllJobs().then(({ rows }) => {
      let jobs = rows;
      const jobChoices = jobs.map(({ job_id, job_title }) => ({
        name: job_title,
        value: job_id,
      }));

      prompt({
        type: 'list',
        name: 'jobId',
        message: "Select the team member's job:",
        choices: jobChoices,
      }).then((res) => {
        let jobId = res.jobId;

        db.getAllEmployees().then(({ rows }) => {
          let employees = rows;
          const supervisorChoices = employees.map(
            ({ employee_id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: employee_id,
            })
          );

          supervisorChoices.unshift({ name: 'None', value: null });

          prompt({
            type: 'list',
            name: 'supervisorId',
            message: "Select the team member's supervisor:",
            choices: supervisorChoices,
          })
            .then((res) => {
              let teamMember = {
                supervisor_id: res.supervisorId,
                job_id: jobId,
                first_name: firstName,
                last_name: lastName,
              };

              db.addEmployee(teamMember);
            })
            .then(() =>
              console.log(`Added ${firstName} ${lastName} to the database.`)
            )
            .then(() => loadMainPrompts());
        });
      });
    });
  });
}

function removeTeamMember() {
  db.getAllEmployees().then(({ rows }) => {
    let teamMembers = rows;
    const teamMemberChoices = teamMembers.map(({ employee_id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: employee_id,
    }));

    prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the team member you want to remove:',
        choices: teamMemberChoices,
      },
    ])
      .then((res) => db.deleteEmployee(res.employeeId))
      .then(() => console.log('Removed team member from the database.'))
      .then(() => loadMainPrompts());
  });
}

function updateTeamMemberJob() {
  db.getAllEmployees().then(({ rows }) => {
    let teamMembers = rows;
    const teamMemberChoices = teamMembers.map(({ employee_id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: employee_id,
    }));

    prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: "Select the team member whose job you want to update:",
        choices: teamMemberChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.getAllJobs().then(({ rows }) => {
        let jobs = rows;
        const jobChoices = jobs.map(({ job_id, job_title }) => ({
          name: job_title,
          value: job_id,
        }));

        prompt([
          {
            type: 'list',
            name: 'jobId',
            message: 'Select the new job for the team member:',
            choices: jobChoices,
          },
        ])
          .then((res) => db.updateEmployeeJob(employeeId, res.jobId))
          .then(() => console.log("Updated team member's job."))
          .then(() => loadMainPrompts());
      });
    });
  });
}

function updateTeamMemberSupervisor() {
  db.getAllEmployees().then(({ rows }) => {
    let teamMembers = rows;
    const teamMemberChoices = teamMembers.map(({ employee_id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: employee_id,
    }));

    prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: "Select the team member whose supervisor you want to update:",
        choices: teamMemberChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.getAllPossibleSupervisors(employeeId).then(({ rows }) => {
        let supervisors = rows;
        const supervisorChoices = supervisors.map(
          ({ employee_id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: employee_id,
          })
        );

        prompt([
          {
            type: 'list',
            name: 'supervisorId',
            message: 'Select the new supervisor for the team member:',
            choices: supervisorChoices,
          },
        ])
          .then((res) => db.updateEmployeeSupervisor(employeeId, res.supervisorId))
          .then(() => console.log("Updated team member's supervisor."))
          .then(() => loadMainPrompts());
      });
    });
  });
}

function viewJobs() {
  db.getAllJobs()
    .then(({ rows }) => {
      let jobs = rows;
      console.log('\n');
      console.table(jobs);
    })
    .then(() => loadMainPrompts());
}

function addJob() {
  db.getAllDivisions().then(({ rows }) => {
    let divisions = rows;
    const divisionChoices = divisions.map(({ division_id, division_name }) => ({
      name: division_name,
      value: division_id,
    }));

    prompt([
      {
        name: 'job_title',
        message: 'Enter the name of the job:',
      },
      {
        name: 'job_salary',
        message: 'Enter the salary for the job:',
      },
      {
        type: 'list',
        name: 'division_id',
        message: 'Select the division this job belongs to:',
        choices: divisionChoices,
      },
    ]).then((job) => {
      db.addJob(job)
        .then(() => console.log(`Added ${job.job_title} to the database.`))
        .then(() => loadMainPrompts());
    });
  });
}

function removeJob() {
  db.getAllJobs().then(({ rows }) => {
    let jobs = rows;
    const jobChoices = jobs.map(({ job_id, job_title }) => ({
      name: job_title,
      value: job_id,
    }));

    prompt([
      {
        type: 'list',
        name: 'jobId',
        message: 'Select the job you want to remove (Warning: This will also remove associated team members):',
        choices: jobChoices,
      },
    ])
      .then((res) => db.deleteJob(res.jobId))
      .then(() => console.log('Removed job from the database.'))
      .then(() => loadMainPrompts());
  });
}

function viewDivisions() {
  db.getAllDivisions()
    .then(({ rows }) => {
      let divisions = rows;
      console.log('\n');
      console.table(divisions);
    })
    .then(() => loadMainPrompts());
}

function addDivision() {
  prompt([
    {
      name: 'division_name',
      message: 'Enter the name of the division:',
    },
  ]).then((res) => {
    let divisionName = res;
    db.addDivision(divisionName)
      .then(() => console.log(`Added ${divisionName.division_name} to the database.`))
      .then(() => loadMainPrompts());
  });
}

function removeDivision() {
  db.getAllDivisions().then(({ rows }) => {
    let divisions = rows;
    const divisionChoices = divisions.map(({ division_id, division_name }) => ({
      name: division_name,
      value: division_id,
    }));

    prompt({
      type: 'list',
      name: 'divisionId',
      message: 'Select the division you want to remove (Warning: This will also remove associated jobs and team members):',
      choices: divisionChoices,
    })
      .then((res) => db.deleteDivision(res.divisionId))
      .then(() => console.log('Removed division from the database.'))
      .then(() => loadMainPrompts());
  });
}

function viewBudgetByDivision() {
  db.viewDivisionBudgets()
    .then(({ rows }) => {
      let divisions = rows;
      console.log('\n');
      console.table(divisions);
    })
    .then(() => loadMainPrompts());
}

function quit() {
  console.log('See you!');
  process.exit();
}

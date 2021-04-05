const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Employee = require('./lib/Employee');
const teamArray = [];

//Choose Role
const chooseRole = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'Select a role to edit, Get All to see all employee info, or select exit to exit the application.',
            name: 'chooseRole',
            choices: ['Employee', 'Engineer', 'Manager', 'Get All', 'exit']

        }
    ]).then(choices => {
        
        let choice = choices.chooseRole
        console.log(choice)
        if (choice === 'exit') {
            console.log(`Thank you for using Team Generator`)
            console.log('Exiting...')
            return;
        }
        else if (choice === 'Get All') {
            getAll();
        }
        else {
            chooseAction(choice)
        };
    })
} 
chooseRole()
//End choose Role
const chooseAction = (role) => {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'chooseAction',
            choices: [`Add new ${role}`, `List all ${role} names`, `See all ${role} info`]
        }
    ]).then(choices => {
        let choice = choices.chooseAction;
        console.log(choice)
       
        switch (choice.split(' ')[0].toLowerCase()) {
            case 'add':
                if (role === 'Manager') {
                    addManager();
                }
                if (role === 'Engineer') {
                    addEngineer();
                }
                if (role === 'Employee') {
                    addEmployee();
                }
                break;

            case 'list':
                getSelectedEmployees(role)
                    break;

            case 'see':
                getAllByRole(role)
                break;

        }
        
    })
}
//Add new manager
function addManager() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: "What is the project manager's name?"
        },
        {
            type: 'input',
            name: 'managerId',
            message: "What is the project manager's ID?"
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "What is the project manager's email?"
        },
        {
            type: 'input',
            name: 'managerOffice',
            message: "What is the project manager's office number?"
        }
    ]).then(response => {
        const manager = new Manager (response.managerName, response.managerId, response.managerEmail, response.managerOffice)
        console.log(manager.name)
        teamArray.push(manager)
        console.log(`A new manager has been added, there have now been a total of ${teamArray.length} members added this session.`)
        chooseRole();
    })
};
//Add new employee
function addEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'employeeName',
            message: "What is the employee's name?"
        },
        {
            type: 'input',
            name: 'employeeId',
            message: "What is the employee's ID?"
        },
        {
            type: 'input',
            name: 'employeeEmail',
            message: "What is the employee's email?"
        }
    ]).then(response => {
        const employee = new Employee (response.employeeName, response.employeeId, response.employeeEmail)
        teamArray.push(employee)
        chooseRole();
    })
};
//Add new engineer
function addEngineer() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: "What is the engineer's name?"
        },
        {
            type: 'input',
            name: 'engineerId',
            message: "What is the engineer's ID?"
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: "What is the engineer's email?"
        },
        {
            type: 'input',
            name: 'engineerGitHub',
            message: 'What is the engineer\'s GitHub?'
        }
    ]).then(response => {
        const engineer = new Engineer (response.engineerName, response.engineerId, response.engineerEmail, response.engineerGitHub)
        teamArray.push(engineer)
        chooseRole();
    })
}
//See all selected employee names
function getSelectedEmployees(choice) {
//filter through and fined with role
const results = teamArray.filter(team => team.getRole() === choice);
let i = -1;
const nameList = results.map(names = () => {
    i++
    return results[i].name
})
console.log()
console.log(`${choice}s`, nameList)
chooseRole();
}
//Get all info
function getAllByRole(choice) {
    const results = teamArray.filter(team => team.getRole() === choice);
    if (results.length <= 0) {
        console.log(`There have not been any ${choice}s logged this session.`)
    } else {console.log(results)}
    chooseRole();
}
//Get all employee info
function getAll() {
    if (teamArray.length > 0) {
    console.log('All employees from this session:',teamArray)
    chooseRole();
    } else {
        console.log('Their have been no employee changes from this session.')
        chooseRole();
    }
}

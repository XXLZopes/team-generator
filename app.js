const fs = require('fs');
const inquirer = require('inquirer');

//questions for user
const manager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the project manager's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the project manager's ID?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the project manager's email?"
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the project manager's github username?"
        },
        {
            type: 'input',
            name: 'office',
            message: "What is the project manager's office number?"
        }
    ]);
};

manager();
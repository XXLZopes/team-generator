const Employee = require('../lib/Employee');

test('create an Employee', () => {
    const employee = new Employee('Aidan');

    expect(employee.name).toBe('Aidan');
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
});
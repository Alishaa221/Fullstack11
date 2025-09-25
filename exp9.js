const readline = require('readline');

// The array to store employee data
const employees = [
  { name: 'Alice', id: 'E101' },
  { name: 'Bob', id: 'E102' },
  { name: 'Charlie', id: 'E103' },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMenu() {
  console.log('\nEmployee Management System');
  console.log('1. Add Employee');
  console.log('2. List Employees');
  console.log('3. Remove Employee');
  console.log('4. Exit');
}

function addEmployee() {
  rl.question('Enter employee name: ', (name) => {
    rl.question('Enter employee ID: ', (id) => {
      employees.push({ name, id });
      console.log(`Employee ${name} (ID: ${id}) added successfully.`);
      startApp();
    });
  });
}

function listEmployees() {
  console.log('\nEmployee List:');
  if (employees.length === 0) {
    console.log('No employees found.');
  } else {
    employees.forEach((employee, index) => {
      console.log(`${index + 1}. Name: ${employee.name}, ID: ${employee.id}`);
    });
  }
  startApp();
}

function removeEmployee() {
  rl.question('Enter employee ID to remove: ', (idToRemove) => {
    const initialLength = employees.length;
    // Find the index of the employee to remove
    const employeeIndex = employees.findIndex(emp => emp.id === idToRemove);
    if (employeeIndex !== -1) {
      const removedEmployee = employees.splice(employeeIndex, 1)[0];
      console.log(`Employee ${removedEmployee.name} (ID: ${removedEmployee.id}) removed successfully.`);
    } else {
      console.log('Employee not found with the given ID.');
    }
    startApp();
  });
}

function startApp() {
  displayMenu();
  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        addEmployee();
        break;
      case '2':
        listEmployees();
        break;
      case '3':
        removeEmployee();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        startApp();
        break;
    }
  });
}

// Start the application
startApp();
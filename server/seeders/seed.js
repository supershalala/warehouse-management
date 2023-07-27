const connectDB = require('../config/connection');

const { User, Task } = require('../models');
const bcrypt = require('bcrypt');

const usersData = [
  {
    name: 'John Doe',
    role: 'manager',
    phone: '+61449055911',
    password: 'Password1!',
  },
  {
    name: 'Jane Smith',
    role: 'manager',
    phone: '+61449055911',
    password: 'Password2!',
  },
  {
    name: 'Michael Johnson',
    role: 'manager',
    phone: '+61449055911',
    password: 'Password3!',
  },
  {
    name: 'Emily Williams',
    role: 'manager',
    phone: '+61449055911',
    password: 'Password4!',
  },
  {
    name: 'David Brown',
    role: 'manager',
    phone: '+61449055911',
    password: 'Password5!',
  },
];

const tasksData = [
  {
    description: 'Task 1',
    dueDate: '2023-08-15',
    status: 'pending',
  },
  {
    description: 'Task 2',
    dueDate: '2023-08-20',
    status: 'pending',
  },
  {
    description: 'Task 3',
    dueDate: '2023-08-25',
    status: 'pending',
  },
  {
    description: 'Task 4',
    dueDate: '2023-08-30',
    status: 'completed',
  },
  {
    description: 'Task 5',
    dueDate: '2023-09-05',
    status: 'pending',
  },
  {
    description: 'Task 6',
    dueDate: '2023-09-10',
    status: 'completed',
  },
  {
    description: 'Task 7',
    dueDate: '2023-09-15',
    status: 'pending',
  },
  {
    description: 'Task 8',
    dueDate: '2023-09-20',
    status: 'completed',
  },
  {
    description: 'Task 9',
    dueDate: '2023-09-25',
    status: 'pending',
  },
  {
    description: 'Task 10',
    dueDate: '2023-09-30',
    status: 'pending',
  },
  {
    description: 'Task 11',
    dueDate: '2023-10-05',
    status: 'completed',
  },
  {
    description: 'Task 12',
    dueDate: '2023-10-10',
    status: 'pending',
  },
];

async function seedDatabase() {
    try {
        await connectDB(); // Connect to the database
  
      await User.deleteMany({});
      const saltRounds = 10;
      const hashedUsersData = await Promise.all(
        usersData.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, saltRounds);
          return {
            ...user,
            password: hashedPassword,
          };
        })
      );
  
      const createdUsers = await User.create(hashedUsersData);
      console.log('Users successfully seeded.');
  
      await Task.deleteMany({});
      const tasksWithUsersData = tasksData.map((task, index) => ({
        ...task,
        assignedTo: createdUsers[index % createdUsers.length]._id,
      }));
  
      await Task.create(tasksWithUsersData);
      console.log('Tasks successfully seeded.');
  
      process.exit(0);
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  }
  
  seedDatabase();
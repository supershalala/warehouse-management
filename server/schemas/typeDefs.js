const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        role: String!
        phone: String!
        tasks: [Task]
    }

    type Task {
        id: ID!
        description: String!
        assignedTo: User!
        dueDate: String!
        status: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        tasks: [Task]
        user(id: ID!): User
        task(id: ID!): Task
    }

    type Mutation {
        createUser(name: String!, role: String!, phone: String!): User
        createTask(description: String!, assignedTo: ID!, dueDate: String!, status: String!): Task
        updateUser(id: ID!, name: String, role: String, phone: String): User
        updateTask(id: ID!, description: String, assignedTo: ID, dueDate: String, status: String): Task
        deleteUser(id: ID!): User
        deleteTask(id: ID!): Task

        signUp(name: String!, role: String!, phone: String!, password: String): Auth
        signIn(phone: String!, password: String): Auth
    
    }
`;

module.exports = typeDefs;

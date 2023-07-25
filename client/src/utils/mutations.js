import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
    mutation signUp($name: String!, $role: String!, $phone: String!, $password: String!) {
        signUp(name: $name, role: $role, phone: $phone, password: $password) {
            token
            user {
                id
                name
            }
        }
    }
`;

export const SIGNIN_USER = gql`
  mutation signIn($phone: String!, $password: String!) {
    signIn(phone: $phone, password: $password) {
      token
      user {
        id
        name
        role
        phone

      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation createTask($description: String!, $assignedTo: String!, $dueDate: String!, $status: String!) {
    createTask(description: $description, assignedTo: $assignedTo, dueDate: $dueDate, status: $status) {
      _id    // Use '_id' since Mongoose is using the default '_id' field
      description
      assignedTo
      dueDate
      status

    }
  }
`;

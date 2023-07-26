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
  mutation createTask($description: String!, $assignedTo: ID!, $dueDate: String!, $status: String!) {
    createTask(description: $description, assignedTo: $assignedTo, dueDate: $dueDate, status: $status) {
      id
      description
      assignedTo {
        id
        name
      }
      dueDate
      status
    }
  }
`;

export const GET_TASKS = gql`
  query getTasks {
    tasks {
      _id
      description
      assignedTo {
        name
      }
      dueDate
      status
    }
  }
`;

// export const UPDATE_TASK = gql`
//   mutation UpdateTask($id: ID!, $description: String!, $assignedTo: ID!, $dueDate: String!, $status: String!) {
//     updateTask(id: $id, description: $description, assignedTo: $assignedTo, dueDate: $dueDate, status: $status) {
//       id
//       description
//       assignedTo {
//         id
//         name
//       }
//       dueDate
//       status
//     }
//   }
// `;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $status: String!) {
    updateTask(id: $id, status: $status) {
      id
      description
      assignedTo {
        id
        name
      }
      dueDate
      status
    }
  }
`;
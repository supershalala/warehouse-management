
import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
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

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;



export const GET_PENDING_TASKS = gql`
  query GetPendingTasks($status: String!) {
    tasks(status: $status) {
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

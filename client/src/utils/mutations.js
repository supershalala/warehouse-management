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
  mutation login($phone: String!, $password: String!) {
    signIn(phone: $phone, password: $password) {
      token
      user {
        _id
        name
        role
        phone
        # Add any other user fields you want to retrieve after successful login
      }
    }
  }
`;
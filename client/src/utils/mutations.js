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

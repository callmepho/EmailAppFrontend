import { gql } from "graphql-request";
import { graphqlClient } from "./graphqlClient";

const client = graphqlClient();

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const registerUser = async (email: string, password: string) => {
  return client.request(CREATE_USER, { email, password });
};

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

type LoginUserResponse = {
  loginUser: {
    id: string;
    token: string;
  };
};

export const loginUser = async (email: string, password: string) => {
  const result = await client.request<LoginUserResponse>(LOGIN_USER, {
    email,
    password,
  });

  localStorage.setItem("token", result.loginUser.token);

  return result.loginUser;
};

const CURRENT_USER = gql`
  query {
    currentUser {
      id
      email
    }
  }
`;

export const fetchCurrentUser = async () => {
  return client.request(CURRENT_USER);
};

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      email
    }
  }
`;

export const deleteUser = async (id: string) => {
  return client.request(DELETE_USER, { id });
};

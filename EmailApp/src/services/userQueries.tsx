import { gql } from "graphql-request";
import { graphqlClient } from "./graphqlClient";

const client = graphqlClient();

type CreateUserResponse = {
  createUser: {
    id: string;
    token: string;
  };
};

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

export const registerUser = async (email: string, password: string) => {
  const newUser = await client.request<CreateUserResponse>(CREATE_USER, {
    email,
    password,
  });
  return newUser.createUser;
};

type LoginUserResponse = {
  loginUser: {
    id: string;
    token: string;
  };
};

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

export const loginUser = async (email: string, password: string) => {
  console.log(email, password);

  const result = await client.request<LoginUserResponse>(LOGIN_USER, {
    email,
    password,
  });
  console.log(result);
  return result.loginUser;
};

type CurrentUserResponse = {
  currentUser: {
    id: string;
    email: string;
  };
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
  const foundUser = await client.request<CurrentUserResponse>(CURRENT_USER);
  console.log(foundUser);
  return foundUser.currentUser;
};

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      email
    }
  }
`;

export const deleteUser = async (id: number) => {
  return client.request(DELETE_USER, { id });
};

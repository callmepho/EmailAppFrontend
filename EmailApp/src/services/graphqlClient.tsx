import { GraphQLClient } from "graphql-request";
const GRAPHQL_ENDPOINT = "http://localhost:5000/graphql";

export const graphqlClient = () => {
  const token = localStorage.getItem("token");
  console.log("current token for cilent " + token);
  return new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

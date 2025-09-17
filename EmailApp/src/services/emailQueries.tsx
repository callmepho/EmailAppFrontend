import { gql } from "graphql-request";
import { graphqlClient } from "./graphqlClient";

const client = graphqlClient();

const GET_ALL_EMAILS = gql`
  query {
    getAllEmails {
      inbox {
        id
        title
        subject
        desc
        read
      }
      outbox {
        id
        title
        subject
        desc
      }
    }
  }
`;

export const fetchAllEmails = async () => {
  return client.request(GET_ALL_EMAILS);
};

const CREATE_EMAIL = gql`
  mutation CreateEmail(
    $recipient: String!
    $title: String!
    $subject: String
    $desc: String
  ) {
    createEmail(
      recipient: $recipient
      title: $title
      subject: $subject
      desc: $desc
    ) {
      id
      title
      subject
      desc
      recipient {
        email
      }
      sender {
        email
      }
    }
  }
`;

export const sendEmail = async (
  recipient: string,
  title: string,
  subject?: string,
  desc?: string
) => {
  return client.request(CREATE_EMAIL, {
    recipient,
    title,
    subject,
    desc,
  });
};

const MARK_EMAIL_AS_READ = gql`
  mutation MarkEmailAsRead($id: ID!) {
    markEmailAsRead(id: $id) {
      id
      title
      read
    }
  }
`;

export const markAsRead = async (id: string) => {
  return client.request(MARK_EMAIL_AS_READ, { id });
};

const DELETE_RECEIVED_EMAIL = gql`
  mutation DeleteReceivedEmail($id: ID!) {
    deleteReceivedEmail(id: $id)
  }
`;

export const deleteInboxEmail = async (id: string) => {
  return client.request(DELETE_RECEIVED_EMAIL, { id });
};

const DELETE_SENT_EMAIL = gql`
  mutation DeleteSentEmail($id: ID!) {
    deleteSentEmail(id: $id)
  }
`;

export const deleteOutboxEmail = async (id: string) => {
  return client.request(DELETE_SENT_EMAIL, { id });
};

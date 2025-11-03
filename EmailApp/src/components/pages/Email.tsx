import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../../services/userQueries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { redirect } from "react-router";
import { useQuery } from "@tanstack/react-query";

const Email = () => {
  const [inbox, setInbox] = useState([]);
  const [outbox, setOutbox] = useState([]);
  const { status, data, error } = useQuery({
    queryKey: ["inbox"],
    queryFn: fetchCurrentUser,
  });
  if (status == "pending") {
    return <span>Loading...</span>; // replace with loading page
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div>
      <p>
        {data.id} {data.email}
      </p>
    </div>
  );
};

export default Email;

const InboxPage = ({ inbox }: any) => {
  return (
    <>
      {inbox.map((email: any) => (
        <EmailCard email={email} />
      ))}
    </>
  );
};

const EmailCard = ({ email }: any) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{/*email title*/}</CardTitle>
        <CardDescription>{/* email desc */}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

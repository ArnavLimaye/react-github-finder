import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layouts/Spinner";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
  const githubContext = useContext(GithubContext);

  const { loading, users } = githubContext;

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div style={userStyle}>
      {users.map(user => (
        <UserItem key={user.id} user={user}></UserItem> //Ask Abhijit why the callback function is not gven in curly braces like we do in Node
      ))}
    </div>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

export default Users;

import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";

const Users = ({ users, loading }) => {
  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div style={userStyle}>
      {users.map((
        user //Ask Abhijit why the callback function is not gven in curly braces like we do in Node
      ) => (
        <UserItem key={user.id} user={user}></UserItem>
      ))}
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

export default Users;

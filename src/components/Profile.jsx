import React, { useContext } from "react";
import { context } from "../index";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useContext(context);

  return (
    <div className="profile">
      <h1>Name : {user?.name}</h1>
      <h1>Email : {user?.email}</h1>
    </div>
  );
};

export default Profile;

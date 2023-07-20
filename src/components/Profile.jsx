import React, { useContext, useEffect, useState } from "react";
import { context, server } from "../index";
import { motion } from "framer-motion";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Profile = () => {
  // const { user } = useContext(context);
  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const [users, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const { data } = axios
      .get(`${server}/me`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setUser(response.data.user?.name);
        setEmail(response.data.user?.email);
        setDate(response.data.user?.createdAt);

        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        console.log(isAuthenticated);
      })
      .catch((error) => {
        console.log(error);
        setIsAuthenticated(false);
      });
  }, [users, email, date]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile">
      <h2>Name : {users}</h2>
      <h2>Email : {email}</h2>
      <h2>Account Created On : {date}</h2>
    </div>
  );
};

export default Profile;

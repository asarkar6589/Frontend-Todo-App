import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { context, server } from "../index";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const submitHandeler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("Error Occured 🤧");
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="register">
      <form onSubmit={submitHandeler}>
        <input
          type="text"
          value={name}
          placeholder="Enter Your Name"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="email"
          value={email}
          placeholder="Enter Your Email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter Your Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Register</button>
      </form>

      <div>
        <p>Or</p>
        <Link to={"/login"} className="reg">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;

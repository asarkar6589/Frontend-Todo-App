import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { context, server } from "../index";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(context);

  const submitHandeler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        }
      );
      setLoading(false);
      toast.success(data.message);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setEmail("");
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login">
      <form onSubmit={submitHandeler}>
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
        <button disabled={loading} type="submit">
          Log In
        </button>
      </form>

      <div>
        <p>Or</p>
        <Link to={"/register"} className="reg">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;

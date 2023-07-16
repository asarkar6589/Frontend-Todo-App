import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { context, server } from "../index";
import axios from "axios";
import { toast } from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(context);

  const logoutHandeler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <div className="navbar">
      <div className="heading">
        <h1>Todo App</h1>
      </div>

      <div className="links">
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>

        {isAuthenticated ? (
          <button disabled={loading} className="btn" onClick={logoutHandeler}>
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import "../src/styles/app.scss";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { context, server } from "./index";

function App() {
  // We will call the my profile function in the starting of the page.
  const { setUser, setIsAuthenticated } = useContext(context);

  useEffect(() => {
    axios
      .get(`${server}/me`, {
        withCredentials: true,
      })
      .then((response) => {
        const x = response.data.message;
        if (x === "Please Log in first") {
          setIsAuthenticated(false);
          setUser({});
        } else {
          setIsAuthenticated(true);
          setUser(response.data.user);
        }
      })
      .catch((err) => {
        setUser({});
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;

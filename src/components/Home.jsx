import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Task from "./Task";
import { context, server } from "../index";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const deleteHandeler = async (id) => {
    await axios
      .delete(`${server}/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  const updateHandeler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error);
    }
  };

  const submitHandeler = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(
        `${server}/create`,
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
      toast.error("Problem occured");
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/all`, {
        withCredentials: true,
      })
      .then((response) => {
        setTask(response.data.task);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [task, refresh]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="home">
      <h1>Todo App</h1>

      <div className="container">
        <h2>Getting Things Done</h2>

        <form onSubmit={submitHandeler}>
          <input
            type="text"
            placeholder="Task Name"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className="taskList">
        {task?.map((item, index) => {
          return (
            <Task
              key={item?._id}
              title={item?.title}
              description={item?.description}
              id={item?._id}
              deleteHandeler={deleteHandeler}
              updateHandeler={updateHandeler}
              isCompleted={item?.isCompleted}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;

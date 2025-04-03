import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask } from "../Redux/actions/taskActions";
import { useToast } from "@chakra-ui/react";

const TaskList = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const tasks = useSelector((state) => state.tasks.tasks);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(getTasks(toast));
  }, [dispatch]);

  return (
    <div className="task-list">
      <h2>Task List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button onClick={() => dispatch(deleteTask(task.id, toast))}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

// src/App.js
import React, { useState } from "react";
import TaskForm from "./Components/TaskForm";
import UpdateTask from "./Components/UpdateTask";
import DeleteTask from "./Components/DeleteTask";
import GetTask from "./Components/GetTask";
import "./App.css"; // Import styling

const App = () => {
  const [activeTab, setActiveTab] = useState("create"); // Default: Create Task

  return (
    <div className="app">
      <h1>Task Management</h1>

      {/* Tabs Section */}
      <div className="tabs">
        <button
          className={activeTab === "create" ? "active-tab" : ""}
          onClick={() => setActiveTab("create")}
        >
          Create Task
        </button>
        <button
          className={activeTab === "update" ? "active-tab" : ""}
          onClick={() => setActiveTab("update")}
        >
          Update Task Status
        </button>
        <button
          className={activeTab === "delete" ? "active-tab" : ""}
          onClick={() => setActiveTab("delete")}
        >
          Delete Task
        </button>
        <button
          className={activeTab === "get" ? "active-tab" : ""}
          onClick={() => setActiveTab("get")}
        >
          Get Task Details
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "create" && <TaskForm />}
        {activeTab === "update" && <UpdateTask />}
        {activeTab === "delete" && <DeleteTask />}
        {activeTab === "get" && <GetTask />}
      </div>
    </div>
  );
};

export default App;

# Task Management

## Overview

This application allows users to create, view, update, and delete tasks. It includes the following properties for each task:

![image](https://github.com/user-attachments/assets/8c2622b2-a1b3-48eb-82a9-1d49869de0d1)


- **Title**
- **Description** (optional)
- **Status** (e.g., "To Do", "In Progress", "Completed")
- **Due Date/Time**

The application is divided into two main parts:
1. **Backend API** - A Spring Boot service to handle tasks and their operations.
2. **Frontend** - A React.js application that provides the user interface.

---

## Tech Stack

### Backend
- **Java 21** (LTS)
- **Spring Boot** (Version 2.7.x or later)
- **Gradle** (Build and dependency management tool)
- **PostgreSQL** (Database)
- **JPA/Hibernate** (Object-Relational Mapping)
- **Validation** (Bean validation for input validation)

### Frontend
- **React.js** (Version 19.1.0)
- **Chakra UI** (UI components and styling)
- **Axios** (HTTP client to make API calls)
- **React Router** (Routing and navigation)
- **Formik** (Form handling)

---

## Work Overview

### Backend

The backend is a **Spring Boot** application that exposes an API for the task management system. It includes functionality for creating, retrieving, updating, and deleting tasks. The backend connects to a PostgreSQL database for persistent storage.

**Key Features:**
- **Create a Task**: Create a new task with title, description (optional), status, and due date/time.
- **Retrieve Tasks**: Get all tasks or a specific task by ID.
- **Update Task**: Change the status of a task.
- **Delete Task**: Remove a task from the system.

### Frontend

The frontend is a **React.js** application that interacts with the backend API to display and manage tasks. It provides a user-friendly interface for users to interact with the task management system.

**Key Features:**
- **Task Management**: Create, view, update, and delete tasks.
- **UI Components**: Responsive and accessible components built using Chakra UI.
- **State Management**: Manage task data with React's useState and useEffect hooks.
- **Error Handling**: Graceful error handling for API failures.

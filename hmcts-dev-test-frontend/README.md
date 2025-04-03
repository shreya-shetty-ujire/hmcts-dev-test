# Task Management System

## Introduction
This is a React-based Task Management system with CRUD operations, utilizing Redux for state management and Chakra UI for UI components.

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 14.x recommended)
- npm or yarn

### Clone the Repository
```sh
git clone https://github.com/shreya-shetty-ujire/hmcts-dev-test.git
cd hmcts-dev-test
```

### Install Dependencies
```sh
npm install
```

### Install Additional Dependencies
The project requires Chakra UI, Toast notifications, and Formik for UI components and form handling. Install them using the following commands:

```sh
npm install @chakra-ui/react@2.10.7 @emotion/react @emotion/styled framer-motion
npm install react-toastify  
npm install formik yup  
```

### Run the Application
```sh
npm start
```
This will start the development server at `http://localhost:3000/`. 

## 1. **Create Task**
- Allows the user to create a new task by entering details such as:
  - **Title**
  - **Description** (optional)
  - **Due Date**
  - **Status** (To Do, In Progress, Completed)
- The created task is added to the task list and stored in the Redux state.

 <img src="https://github.com/user-attachments/assets/36e9bf04-2734-443f-a980-4d7e4ef76455" alt="page" width="450" height="auto" />
 
## 2. **Get All Tasks**
- Displays a list of all tasks in a table format.
- Fetches the task data from the Redux state and presents it in an easy-to-read format.
- Tasks include:
  - **Task ID**
  - **Title**
  - **Description**
  - **Due Date**
  - **Status**
 
  <img src="https://github.com/user-attachments/assets/00d923b3-ed65-4e2b-af8c-5d76bcead7de" alt="page" width="450" height="auto" />


## 3. **Get Task By ID**
- Allows the user to search for a task by entering the **Task ID**.
- Displays detailed information about the specific task such as:
  - **Task ID**
  - **Title**
  - **Description**
  - **Status**
  - **Due Date**
 
    <img src="https://github.com/user-attachments/assets/923ea9c4-b8f6-4cd9-b753-6ad1588268e5" alt="page" width="450" height="auto" />

## 4. **Update Task Status**
- Allows the user to update the status of a task by providing a **Task ID**.
- Displays the task details and allows the user to change the task's status (e.g., from "To Do" to "Pending").
- Once updated, the new status is reflected in the task list.
  
<img src="https://github.com/user-attachments/assets/ac94a778-ca6b-4b2b-b7f7-04df2b895c40" alt="page" width="450" height="auto" />

## 5. **Delete Task**
- Allows the user to delete a task by entering the **Task ID**.
- A confirmation modal appears to ensure the user wants to proceed with deletion.
- The task is removed from the list and the Redux state.

---

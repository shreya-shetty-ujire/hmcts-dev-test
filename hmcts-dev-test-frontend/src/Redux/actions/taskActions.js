import axios from 'axios';

export const GET_TASKS = 'GET_TASKS';
export const GET_TASK_BY_ID = 'GET_TASK_BY_ID';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SET_ERROR = 'SET_ERROR';

const apiUrl = 'http://localhost:4000/tasks';

const handleError = (error, dispatch, toast) => {
  let message = "Something went wrong. Please try again.";

  if (error.response) {
    // Handle backend error response
    const errorData = error.response.data;
    
    // If the error contains a message, use it
    if (errorData && errorData.message) {
      message = errorData.message;
    } else if (errorData && errorData.details) {
      message = errorData.details;  // Could be another specific error message
    } else {
      // Fallback if no message or details are found
      message = `Error ${error.response.status}: ${error.response.statusText}`;
    }
  } else if (error.request) {
    message = "No response from the server. Please check your connection.";
  }

  dispatch({ type: SET_ERROR, payload: message });

  toast({
    title: "Error",
    description: message,  // Show the custom message from backend
    status: "error",
    duration: 3000,
    isClosable: true,
  });
};



// Create task
export const createTask = (task, toast) => async (dispatch) => {
  
  try {
    const res = await axios.post(`${apiUrl}/create`, task);
    console.log("Response from API:", res.data);
    dispatch({ type: ADD_TASK, payload: res.data });

    toast({
      title: "Task Created",
      description: `Task "${res.data.title}" has been created successfully.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    console.error("Error creating task:", error); 
    handleError(error, dispatch, toast);
  }
};

// Get all tasks
export const getTasks = (toast) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}/getAll`);
    dispatch({ type: GET_TASKS, payload: res.data });
  } catch (error) {
    handleError(error, dispatch, toast);
  }
};

// Get task by ID
export const getTaskById = (id, toast) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}/getById/${id}`);
    dispatch({ type: GET_TASK_BY_ID, payload: res.data });
  } catch (error) {
    console.log(error)
    handleError(error, dispatch, toast);
  }
};

// Delete task
export const deleteTask = (id, toast) => async (dispatch) => {
  try {
    await axios.delete(`${apiUrl}/delete/${id}`);
    dispatch({ type: DELETE_TASK, payload: id });

    toast({
      title: "Task Deleted",
      description: `Task with ID ${id} has been deleted.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    handleError(error, dispatch, toast);
  }
};

export const updateTaskStatus = (id, status, toast) => async (dispatch) => {
  try {
    const res = await axios.put(`${apiUrl}/${id}/status?status=${status}`);
    dispatch({ type: "UPDATE_TASK_STATUS", payload: res.data });
  } catch (error) {
    console.log(error)
    handleError(error, dispatch, toast);
  }
};

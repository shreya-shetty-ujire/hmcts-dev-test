import { GET_TASKS, GET_TASK_BY_ID, ADD_TASK, DELETE_TASK, SET_ERROR } from "../actions/taskActions";

const initialState = {
  tasks: [],
  taskById: null,
  error: null,
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: action.payload, error: null };
    case GET_TASK_BY_ID:
      return { ...state, taskById: action.payload, error: null };
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload], error: null };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        error: null,
      };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

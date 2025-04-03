
import { createStore, applyMiddleware, combineReducers } from 'redux';

import taskReducer from './reducers/taskReducer';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: taskReducer, // Include taskReducer here
  });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

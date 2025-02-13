import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Если вы используете redux-thunk для асинхронных действий
import authReducer from './authReducer'; // Ваш authReducer

const store = createStore(combineReducers({ auth: authReducer }), applyMiddleware(thunk));

export default store;
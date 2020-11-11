import {combineReducers} from 'redux';
import chatReducer from './chat';
import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
});
export default rootReducer;

import {combineReducers} from 'redux';
import chatReducer from './chat';
import userReducer from './user';
import tokenReducer from './token';

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  token: tokenReducer,
});
export default rootReducer;

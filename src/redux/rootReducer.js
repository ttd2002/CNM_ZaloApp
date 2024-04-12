import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";
import authReducer from "./slices/auth";
import messageReducer from './slices/messageSlice'; 
import userReducer from './slices/userSlice'
import chatReducer from "./slices/chatSlices";
// slices

const rootPeristConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  // whitelist: [],
  //blacklist: [],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  messages: messageReducer,
  user: userReducer,
  chat: chatReducer,
});

export { rootPeristConfig, rootReducer };
 
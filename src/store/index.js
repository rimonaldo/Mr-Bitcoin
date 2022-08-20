import {
  applyMiddleware,
  legacy_createStore as createStore,
  compose,
  combineReducers,
} from "redux";
import { contactReducer } from "./reducers/contactReducer";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  contactModule: contactReducer,
  userModule: userReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

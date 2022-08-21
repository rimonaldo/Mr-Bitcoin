import { userService } from "../../services/userService";

const INITIAL_STATE = {
  loggedUser: JSON.parse(sessionStorage.getItem("loggedUser")) || null,
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_LOGGED_USER":
      console.log(action.user);
      return {
        ...state,
        loggedUser: action.user,
      };

    case "SEND_COINS":
      const { loggedUser } = state;
      return {
        ...state,
        loggedUser: { ...loggedUser, coins: loggedUser.coins - action.amount },
      };

    case "SAVE_USER":
      return {
        ...state,
        loggedUser: action.userToUpadte
      };

    default:
      return state;
  }
}

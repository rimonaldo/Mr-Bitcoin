import { userService } from "../../services/userService";

export function setLoggedUser(name) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(name);
      dispatch({ type: "SET_LOGGED_USER", user });
      return user
    } catch (err) {
      console.log(err);
    }
  };
}

export function saveUser(userToUpadte) {
  return async (dispatch) => {
    try {
      dispatch({ type: "SAVE_USER", userToUpadte });
      userService.saveUser(userToUpadte)
    } catch (err) {
      console.log(err);
    }
  };
}



export function sendCoins(amount) {
  return async (dispatch) => {
    try {
      dispatch({ type: "SEND_COINS", amount});
    } catch (err) {
      console.log(err);
    }
  };
}


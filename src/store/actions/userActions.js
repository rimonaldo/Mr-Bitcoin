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



export function sendCoins(amount,to) {
  return async (dispatch) => {
    try {
      // userService.addMove(amount)
      dispatch({ type: "SEND_COINS", amount , to});
    } catch (err) {
      console.log(err);
    }
  };
}


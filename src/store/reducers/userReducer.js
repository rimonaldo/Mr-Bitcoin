import { userService } from "../../services/userService";

const INITIAL_STATE =  {
  loggedUser: userService.getUser()|| null,
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_LOGGED_USER":
      console.log(action.user);
      return {
        ...state,
        loggedUser: action.user,
      };

      case 'SEND_COINS':
        const { loggedUser } = state
        console.log('loggedUser',loggedUser);
        console.log('amount',action.amount);
        return {
            ...state,
            loggedUser: { ...loggedUser, coins: loggedUser.coins - action.amount }
        }

    default:
      return state;
  }

}



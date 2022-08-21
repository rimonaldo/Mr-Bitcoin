const INITIAL_STATE = {
  loggedUser: JSON.parse(sessionStorage.getItem("loggedUser")) || null,
  moves:JSON.parse(localStorage.getItem("userMoves")) || [],
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
      const { loggedUser} = state;
      const move = {from:loggedUser.name, at:Date.now(), amount:action.amount, to:action.to }
      let moves = loggedUser.moves
      if (!moves || !moves.length) moves = []
      moves.push(move)
      return {
        ...state,
        loggedUser: { ...loggedUser, coins: loggedUser.coins - action.amount , moves},
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

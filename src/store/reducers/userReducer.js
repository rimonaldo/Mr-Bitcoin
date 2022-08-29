const INITIAL_STATE = {
   loggedUser: JSON.parse(sessionStorage.getItem('loggedUser')) || null,
   moves: JSON.parse(localStorage.getItem('userMoves')) || [],
   balance: 0,
}

export function userReducer(state = INITIAL_STATE, action) {
   switch (action.type) {
      case 'SET_LOGGED_USER':
         console.log(action.user)
         return {
            ...state,
            loggedUser: action.user,
         }

      case 'SET_BALANCE':
         return {
            ...state,
            balance: action.balance,
         }

      case 'SEND_COINS':
         const { loggedUser } = state
         const { username, walletAddress } = loggedUser
         const move = {
            status:'pending',
            from: { username, walletAddress },
            at: Date.now(),
            amount: action.amount,
            _id:action._id,
            to: { name: action.to.name, walletAddress: 'address', _id: action.to._id },
         }
         let moves = loggedUser.moves
         if (!moves || !moves.length) moves = []
         moves.unshift(move)
         return {
            ...state,
            loggedUser: {
               ...loggedUser,
               coins: loggedUser.coins - action.amount,
               moves,
            },
         }

      case 'SAVE_USER':
         return {
            ...state,
            loggedUser: action.userToUpadte,
         }

      default:
         return state
   }
}

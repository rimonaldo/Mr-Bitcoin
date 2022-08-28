const INITIAL_STATE = {
   rate: JSON.parse(localStorage.getItem("rate")) || "",
   balannce: 0,
   pending: [],
   block: null,
}

export function tokenReducer(state = INITIAL_STATE, action) {
   switch (action.type) {
      case "SET_RATE":
         localStorage.setItem("rate", JSON.stringify(action.rate))
         return {
            ...state,
            rate: action.rate,
         }

      case "GET_BALANCE":
         // localStorage.setItem('rate',JSON.stringify(action.rate))
         return {
            ...state,
            balance: action.balance,
         }

      case "SET_PENDING":
         localStorage.setItem("pending", JSON.stringify(action.pending))
         return {
            ...state,
            pending: action.pending,
         }

      case "MINE_PENDING":
         localStorage.setItem("pending", JSON.stringify(action.rate))
         return {
            ...state,
            block: action.block,
         }

      default:
         return state
   }
}

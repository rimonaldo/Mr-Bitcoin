const INITIAL_STATE = {
   rate: JSON.parse(localStorage.getItem('rate')) || ''
  };
  
  export function tokenReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "SET_RATE":
        localStorage.setItem('rate',JSON.stringify(action.rate))
        return {
          ...state,
          rate: action.rate,
        };
      default:
        return state;
    }
  }
  
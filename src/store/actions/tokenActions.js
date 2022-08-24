export function setRate(rate) {
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_RATE", rate });
        return rate
      } catch (err) {
        console.log(err);
      }
    };
  }
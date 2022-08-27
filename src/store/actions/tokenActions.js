import {bitcoinService} from '../../services/bitcoinService'

export function setRate(rate) {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_RATE", rate });
      return rate;
    } catch (err) {
      console.log(err);
    }
  };
}

export function getBalance(address) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_BALANCE",address});
    } catch (err) {
      console.log(err);
    }
  };
}

export function loadPending() {
  return async (dispatch) => {
    const pending = await bitcoinService.getPending()
    try {
      dispatch({ type: "SET_PENDING" , pending});
      return pending
    } catch (err) {
      console.log(err);
    }
  };
}

export function minePending() {
  return async (dispatch) => {
    const block = await bitcoinService.minePending()
    console.log('action');
    try {
      dispatch({ type: "MINE_PENDING",block });
      return block
    } catch (err) {
      console.log(err);
    }
  };
}
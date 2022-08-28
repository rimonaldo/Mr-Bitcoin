import { userService } from '../../services/userService'

export function setLoggedUser(name) {
   return async dispatch => {
      try {
         const user = await userService.signup(name)
         dispatch({ type: 'SET_LOGGED_USER', user })
         return user
      } catch (err) {
         console.log(err)
      }
   }
}

export function sendCoins(amount, to) {
   return async dispatch => {
      try {
         // await userService.
         // userService.addMove(amount)
         userService.addTranaction(amount,to)
         dispatch({ type: 'SEND_COINS', amount, to })
      } catch (err) {
         console.log(err)
      }
   }
}

export function setBalance(privateKey) {
   return async dispatch => {
      try {
         const balance = await userService.getBalance(privateKey)
         dispatch({ type: 'SET_BALANCE', balance})
      } catch (err) {
         console.log(err)
      }
   }
}

export function saveUser(userToUpadte) {
   console.log(userToUpadte)
   return async dispatch => {
      try {
         await userService.updateUser(userToUpadte)
         dispatch({ type: 'SAVE_USER', userToUpadte })
         // userService._saveLocalUser(userToUpadte)
      } catch (err) {
         console.log(err)
      }
   }
}

import { userService } from '../../services/userService'

export function setLoggedUser(username, password) {
   return async dispatch => {
      try {
         const credentials = { username, password }
         let user
         if (password) {
            user = await userService.login(credentials)
         } else {
            user = await userService.signup(username)
         }
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
         to = await userService.getById(to._id)
         const tx = await userService.addTranaction(amount, to)
         const { _id } = tx
         dispatch({ type: 'SEND_COINS', amount, to, _id })
      } catch (err) {
         console.log(err)
      }
   }
}

export function setBalance(privateKey) {
   return async dispatch => {
      try {
         const balance = await userService.getBalance(privateKey)
         dispatch({ type: 'SET_BALANCE', balance })
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

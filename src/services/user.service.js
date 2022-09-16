import { httpService } from './http.service'

const STORAGE_KEY = 'loggedUser'
const LOGGED_KEY = 'loggedUser'

export const userService = {
   login,
   signup,
   logout,
   removeUser,
   updateUser,
   getUsers,
   getById,
   getUser,
   _saveLocalUser,
}

const gUser = {
   _id: 101,
   name: 'Rimon Sade',
   email: 'ochoahyde@renovize.com',
   phone: '+1 (968) 593-3824',
   coins: 100,
}

function getUser() {
   const user = JSON.parse(sessionStorage.getItem(LOGGED_KEY)) || gUser
   return new Promise((resolve, reject) => {
      user ? resolve(user) : reject('no user is logged')
   })
}

async function signup(username) {
   let signupInfo = { username, password: '123' }
   const user = await httpService.post('auth/signup', signupInfo)

   if (user) console.log(username, 'is logged')
   return _saveLocalUser(user)
}

async function getUsers() {
   console.log('getting users')
   return await httpService.get('user')
}

async function getById(userId) {
   const user = await httpService.get(`user/${userId}`)
   return user
}

async function login(credentials) {
   console.log('login with', credentials);
   const user = await httpService.post('auth/login', credentials)
   if (user) return _saveLocalUser(user)
}

async function logout() {
   console.log('login out')
   sessionStorage.removeItem(STORAGE_KEY)
   return await httpService.post('auth/logout')
}

async function removeUser(userId) {
   return httpService.delete(`user/${userId}`)
}
async function updateUser(user = null, username) {
   if(!user){
      const users = await getUsers()
      user = users.find(user=> user.username === username)
   }
   
   user = await httpService.put(`user/${user._id}`, user)
   console.log('updating', user.username)
   if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
   return user
}
function getLoggedinUser() {
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')
}

function _saveLocalUser(user) {
   sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
   return user
}

// ;(async () => {
//   var user = getLoggedinUser()
//   // Dev Helper: Listens to when localStorage changes in OTHER browser

//   // Here we are listening to changes for the watched user (comming from other browsers)
//   window.addEventListener('storage', async () => {
//       if (!gWatchedUser) return
//       const freshUsers = await storageService.query('user')
//       const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
//       if (!watchedUser) return
//       if (gWatchedUser.score !== watchedUser.score) {
//           console.log('Watched user score changed - localStorage updated from another browser')
//           socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
//       }
//       gWatchedUser = watchedUser
//   })
// })()


// async function addMove(amount) {
//    const loggedUser = await getUser()
//    const move = { from: loggedUser.username, at: Date.now(), amount }
//    let moves = loggedUser.moves

//    console.log(moves)
//    if (!moves || !moves.length) moves = []
//    console.log(moves)
//    moves.push(move)
//    console.log(moves)
//    // saveUser(loggedUser)
// }

// async function addTranaction(amount, toAddress) {
//    const { walletAddress, privateKey } = await getUser()
//    const balance = await getBalance(privateKey)
//    if(amount > balance) return console.log('not enough coins');
//    const tx = {
//       fromAddress: walletAddress,
//       toAddress: toAddress.walletAddress || 'address',
//       amount: +amount,
//       privateKey,
//    }
//    return await httpService.post('popCoin/transaction', tx)
// }

// async function getBalance(privateKey) {
//    const balance = await httpService.get(`popCoin/wallet/${privateKey}`)
//    const signupBonus = 1000
//    return balance + signupBonus
// }
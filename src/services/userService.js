export const userService = {
  getUser,
  signup,
  addMove,
};

const LOGGED_KEY = "loggedUser";

const gUser = {
  _id: 101,
  name: "Rimon Sade",
  email: "ochoahyde@renovize.com",
  phone: "+1 (968) 593-3824",
  coins: 100,
};

function getUser() {
  const user =  JSON.parse(sessionStorage.getItem(LOGGED_KEY)) || gUser;
  return new Promise((resolve, reject) =>{
    user ? resolve(user) : reject('no user is logged')
  })
}

function signup(name) {
  console.log(name, 'is logged');

  const newUser = {
    _id: _makeId(),
    name,
    email: `${name}@renovize.com`,
    phone: "+1 (968) 593-3824",
    coins: 100,
  };
  sessionStorage.setItem(LOGGED_KEY, JSON.stringify(newUser));
  return newUser;
}

function addMove(amount) {
  const loggedUser = getUser();
  loggedUser.coins -= amount;
  _saveUser(loggedUser);
}

function _saveUser(user) {
  sessionStorage.setItem(LOGGED_KEY, JSON.stringify(user));
}

function _makeId(length = 7) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
import { storageService } from './storage.service'
import { userService } from './user.service'
const CONTACTS_KEY = 'contacts_db'
export const contactService = {
   getContacts,
   getContactById,
   deleteContact,
   saveContact,
   getEmptyContact,
   createContacts,
   CONTACTS_KEY,
   getUserContacts,
}

// const contacts = [
//    {
//       _id: '630c9ff248ecdb441462d071',
//       name: 'Ochoa Hyde',
//       email: 'ochoahyde@renovize.com',
//       phone: '+1 (968) 593-3824',
//    },
//    {
//       _id: '630c9f6b48ecdb441462d06c',
//       name: 'Hallie Mclean',
//       email: 'halliemclean@renovize.com',
//       phone: '+1 (948) 464-2888',
//    },
//    {
//       _id: '630ca03548ecdb441462d074',
//       name: 'Parsons Norris',
//       email: 'parsonsnorris@renovize.com',
//       phone: '+1 (958) 502-3495',
//    },
//    {
//       _id: '630ca06148ecdb441462d075',
//       name: 'Rachel Lowe',
//       email: 'rachellowe@renovize.com',
//       phone: '+1 (911) 475-2312',
//    },
//    {
//       _id: '630c9ece48ecdb441462d066',
//       name: 'Dominique Soto',
//       email: 'dominiquesoto@renovize.com',
//       phone: '+1 (807) 551-3258',
//    },
//    {
//       _id: '630ca0a148ecdb441462d078',
//       name: 'Shana Pope',
//       email: 'shanapope@renovize.com',
//       phone: '+1 (970) 527-3082',
//    },
//    {
//       _id: '630c9ef848ecdb441462d067',
//       name: 'Faulkner Flores',
//       email: 'faulknerflores@renovize.com',
//       phone: '+1 (952) 501-2678',
//    },
//    {
//       _id: '630c9f8448ecdb441462d06d',
//       name: 'Holder Bean',
//       email: 'holderbean@renovize.com',
//       phone: '+1 (989) 503-2663',
//    },
//    {
//       _id: '630ca07d48ecdb441462d076',
//       name: 'Rosanne Shelton',
//       email: 'rosanneshelton@renovize.com',
//       phone: '+1 (968) 454-3851',
//    },
//    {
//       _id: '630ca01e48ecdb441462d073',
//       name: 'Pamela Nolan',
//       email: 'pamelanolan@renovize.com',
//       phone: '+1 (986) 545-2166',
//    },
//    {
//       _id: '630ca09048ecdb441462d077',
//       name: 'Roy Cantu',
//       email: 'roycantu@renovize.com',
//       phone: '+1 (929) 571-2295',
//    },
//    {
//       _id: '630ca00848ecdb441462d072',
//       name: 'Ollie Christian',
//       email: 'olliechristian@renovize.com',
//       phone: '+1 (977) 419-3550',
//    },
//    {
//       _id: '630c9fd348ecdb441462d070',
//       name: 'Nguyen Walls',
//       email: 'nguyenwalls@renovize.com',
//       phone: '+1 (963) 471-3181',
//    },
//    {
//       _id: '630c9f3748ecdb441462d069',
//       name: 'Glenna Santana',
//       email: 'glennasantana@renovize.com',
//       phone: '+1 (860) 467-2376',
//    },
//    {
//       _id: '630c9fbd48ecdb441462d06f',
//       name: 'Malone Clark',
//       email: 'maloneclark@renovize.com',
//       phone: '+1 (818) 565-2557',
//    },
//    {
//       _id: '630c9f1048ecdb441462d068',
//       name: 'Floyd Rutledge',
//       email: 'floydrutledge@renovize.com',
//       phone: '+1 (807) 597-3629',
//    },
//    {
//       _id: '630c9f5448ecdb441462d06b',
//       name: 'Grace James',
//       email: 'gracejames@renovize.com',
//       phone: '+1 (959) 525-2529',
//    },
//    {
//       _id: '630ca0c348ecdb441462d079',
//       name: 'Tanner Gates',
//       email: 'tannergates@renovize.com',
//       phone: '+1 (978) 591-2291',
//    },
//    {
//       _id: '630c9fa248ecdb441462d06e',
//       name: 'Lilly Conner',
//       email: 'lillyconner@renovize.com',
//       phone: '+1 (842) 587-3812',
//    },
// ]

const contacts = [
   {
      id: '630c9ff248ecdb441462d071',
      name: 'Ochoa Hyde',
      username: 'ochoa',
      email: 'ochoahyde@renovize.com',
      phone: '+1 (968) 593-3824',
   },
   {
      id: '630c9f6b48ecdb441462d06c',
      name: 'Hallie Mclean',
      username: 'hallie',
      email: 'halliemclean@renovize.com',
      phone: '+1 (948) 464-2888',
   },
   {
      id: '630ca03548ecdb441462d074',
      name: 'Parsons Norris',
      username: 'parsons',
      email: 'parsonsnorris@renovize.com',
      phone: '+1 (958) 502-3495',
   },
   {
      id: '630ca06148ecdb441462d075',
      name: 'Rachel Lowe',
      username: 'rachel',
      email: 'rachellowe@renovize.com',
      phone: '+1 (911) 475-2312',
   },
   {
      id: '630c9ece48ecdb441462d066',
      name: 'Dominique Soto',
      username: 'dominique',
      email: 'dominiquesoto@renovize.com',
      phone: '+1 (807) 551-3258',
   },
   {
      id: '630ca0a148ecdb441462d078',
      name: 'Shana Pope',
      username: 'shana',
      email: 'shanapope@renovize.com',
      phone: '+1 (970) 527-3082',
   },
   {
      id: '630c9ef848ecdb441462d067',
      name: 'Faulkner Flores',
      username: 'faulkner',
      email: 'faulknerflores@renovize.com',
      phone: '+1 (952) 501-2678',
   },
   {
      id: '630c9f8448ecdb441462d06d',
      name: 'Holder Bean',
      username: 'holder',
      email: 'holderbean@renovize.com',
      phone: '+1 (989) 503-2663',
   },
   {
      id: '630ca07d48ecdb441462d076',
      name: 'Rosanne Shelton',
      username: 'rosanne',
      email: 'rosanneshelton@renovize.com',
      phone: '+1 (968) 454-3851',
   },
   {
      id: '630ca01e48ecdb441462d073',
      name: 'Pamela Nolan',
      username: 'pamela',
      email: 'pamelanolan@renovize.com',
      phone: '+1 (986) 545-2166',
   },
   {
      id: '630ca09048ecdb441462d077',
      name: 'Roy Cantu',
      username: 'roy',
      email: 'roycantu@renovize.com',
      phone: '+1 (929) 571-2295',
   },
   {
      id: '630ca00848ecdb441462d072',
      name: 'Ollie Christian',
      username: 'ollie',
      email: 'olliechristian@renovize.com',
      phone: '+1 (977) 419-3550',
   },
   {
      id: '630c9fd348ecdb441462d070',
      name: 'Nguyen Walls',
      username: 'nguyen',
      email: 'nguyenwalls@renovize.com',
      phone: '+1 (963) 471-3181',
   },
   {
      id: '630c9f3748ecdb441462d069',
      name: 'Glenna Santana',
      username: 'glenna',
      email: 'glennasantana@renovize.com',
      phone: '+1 (860) 467-2376',
   },
   {
      id: '630c9fbd48ecdb441462d06f',
      name: 'Malone Clark',
      username: 'malone',
      email: 'maloneclark@renovize.com',
      phone: '+1 (818) 565-2557',
   },
   {
      id: '630c9f1048ecdb441462d068',
      name: 'Floyd Rutledge',
      username: 'floyd',
      email: 'floydrutledge@renovize.com',
      phone: '+1 (807) 597-3629',
   },
   {
      id: '630c9f5448ecdb441462d06b',
      name: 'Grace James',
      username: 'grace',
      email: 'gracejames@renovize.com',
      phone: '+1 (959) 525-2529',
   },
   {
      id: '630ca0c348ecdb441462d079',
      name: 'Tanner Gates',
      username: 'tanner',
      email: 'tannergates@renovize.com',
      phone: '+1 (978) 591-2291',
   },
   {
      id: '630c9fa248ecdb441462d06e',
      name: 'Lilly Conner',
      username: 'lilly',
      email: 'lillyconner@renovize.com',
      phone: '+1 (842) 587-3812',
   },
]

async function getContacts(filterBy = null) {
   const loggedUser = await userService.getUser()
   const user = await userService.getById(loggedUser._id)
   console.log('contacts exists')
   console.log(user.contacts)
   const localContacts = await storageService.query(CONTACTS_KEY)
   if (!user.contacts || !user.contacts.length || user.contacts.length < 15) {
      console.log('creating contacts') 
      user.contacts = await contactService.createContacts()
      await userService.updateUser(user)
   }
   if (!localContacts.length) storageService.postMany(CONTACTS_KEY, user.contacts)

   return new Promise((resolve, reject) => {
      if (filterBy && filterBy.term) {
         user.contacts = filter(filterBy.term)
      }
      resolve(_sort(user.contacts))
   })
}

function getContactById(id) {
   return new Promise((resolve, reject) => {
      const contact = storageService.get(CONTACTS_KEY, id)
      contact ? resolve(contact) : reject(`Contact id ${id} not found!`)
   })
}

function deleteContact(id) {
   storageService.remove(CONTACTS_KEY, id)
   return new Promise((resolve, reject) => {
      const index = contacts.findIndex(contact => contact._id === id)
      if (index !== -1) {
         contacts.splice(index, 1)
      }
      resolve(contacts)
   })
}

function saveContact(contact) {
   return contact._id ? _updateContact(contact) : _addContact(contact)
}

function getEmptyContact() {
   return {
      name: '',
      email: '',
      phone: '',
   }
}

function filter(term) {
   term = term.toLocaleLowerCase()
   return contacts.filter(contact => {
      return (
         contact.name.toLocaleLowerCase().includes(term) ||
         contact.phone.toLocaleLowerCase().includes(term) ||
         contact.email.toLocaleLowerCase().includes(term)
      )
   })
}

// INNER USED FUNCTIONS

function _updateContact(contact) {
   console.log('updating', contact);
   const contactsToUpdate = getContacts()
   // storageService.put(CONTACTS_KEY, contact)
   // return new Promise((resolve, reject) => {
   //    const index = contacts.findIndex(c => contact._id === c._id)
   //    if (index !== -1) {
   //       contacts[index] = contact
   //       console.log('updated', contact)
   //    }
   //    resolve(contact)
   // })
}

function _addContact(contact) {
   storageService.post(CONTACTS_KEY, contact)
   userService.signup(contact)
   return new Promise((resolve, reject) => {
      contacts.push(contact)
      resolve(contact)
   })
}


async function createContacts() {
   let miniContacts = []
   let contactsFromUsers = await userService.getUsers()
   let contactsToReturn = contactsFromUsers || (await userService.signupOthers(contacts))
   contactsToReturn.map(c => {
      let miniContact = {
         _id: c._id,
         walletAddress: c.walletAddress,
         name: c.name,
         username: c.username,
         phone: c.phone,
         email: c.email,
      }
      miniContacts.push(miniContact)
   })
   contactsToReturn = miniContacts
   const localContacts = await storageService.query(CONTACTS_KEY)
   if (!localContacts.length) storageService.postMany(CONTACTS_KEY, contactsToReturn)
   return contactsToReturn
}

async function getUserContacts(){
   const loggedUser = await userService.getUser()
   const user = await userService.getById(loggedUser._id)
   return user.contacts
}

// UTILS

function _makeId(length = 10) {
   var txt = ''
   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
   }
   return txt
}

function _sort(arr) {
   return arr.sort((a, b) => {
      a.name = a.name || a.username
      b.name = b.name || b.username
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
         return -1
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
         return 1
      }

      return 0
   })
}

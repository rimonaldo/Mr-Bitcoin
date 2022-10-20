import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setLoggedUser } from '../store/actions/userActions'
import { loadContacts } from '../store/actions/contactActions'
export class _SignupPage extends Component {

   render() {
      return (
         <section className="landing">
            <div className="bg">
               <img src="https://i.ibb.co/7zDh80P/pop-Coin-doodle.png" alt="" />
            </div>

            <div className="signup-page">
               <div className="hero">
                  <h1>popCoin</h1>
                  <p>
                     popCoin lets you keep, transfer and manage coins to watch your favourite media and video games on
                     demand, using the power of blockchain
                  </p>
               </div>
               <br />
               {/* <input placeholder="username" type="text" onChange={ev => this.handleChange(ev)} name="username" /> */}
               <button className="btn" onClick={() => this.onStartDemo()}>
                  Start demo
               </button>

               <div className="galleries">
                  <div className="icons-gallery">
                     <div className="item fast">
                        <img src="https://cdn-icons-png.flaticon.com/512/1408/1408799.png" alt="" />
                        <span>FAST</span>
                     </div>

                     <div className="item safe">
                        <img src="https://i.ibb.co/Cs9fnSc/security.png" alt="" />
                        <span>SAFE</span>
                     </div>

                     <div className="item reliable">
                        <img src="https://i.ibb.co/Kb1ywdX/handshake.png" alt="" />
                        <span>RELIABLE</span>
                     </div>
                  </div>

                  <div className="app-gallery">
                     <div className="item">
                        <span>SHOW CHARTS</span>
                        <img src="https://i.ibb.co/XX0ZR1q/Image-1.png" alt="" />
                     </div>
                     <div className="item">
                        <span>MINE BLOCKS</span>
                        <img src="https://i.ibb.co/Gv0CVVR/Image-2.png" alt="" />
                     </div>
                     <div className="item">
                        <span>SAVE CONTACTS</span>
                        <img src="https://i.ibb.co/DCjD77z/Image-3.png" alt="" />
                     </div>

                     <div className="item">
                        <span>TRANSFER COINS</span>
                        <img src="https://i.ibb.co/hK71XB1/Image-4.png" alt="" />
                     </div>
                  </div>
               </div>

               <div className="logo"></div>
               <span>login</span>
               <br />
               <input placeholder="username" type="text" onChange={ev => this.handleChange(ev)} name="username" />
               {/* <input placeholder="password" type="text" onChange={ev => this.handleChange(ev)} name="password" /> */}
               <button className="button" onClick={() => this.onLogin()}>
                  Login
               </button>

               <span>signup</span>
               <br />
               <input placeholder="username" type="text" onChange={ev => this.handleChange(ev)} name="username" />
               <button className="button" onClick={() => this.onSignup()}>
                  Signup
               </button>
            </div>
         </section>
      )
   }

   state = {
      username: '',
      password: '123',
   }
   componentDidMount() {}

   // ON INPUT CHANGE SET USER NAME
   async handleChange({ target }) {
      const field = target.name
      const value = target.type === 'number' ? +target.value || '' : target.value
      this.setState(prevState => ({
         [field]: value,
      }))
   }

   // DISPATCH SET LOGGED USER
   async onSignup() {
      const name = this.state.username
      if (!name) return
      const loggedUser = await this.props.setLoggedUser(name)
      if (loggedUser) this.loadApp(loggedUser)
   }

   async onLogin() {
      const { username, password } = this.state
      if (!username || !password) return
      const loggedUser = await this.props.setLoggedUser(username, password)
      if (loggedUser) this.loadApp(loggedUser)
   }

   async onStartDemo() {
      const username = 'Employer'
      const password = '123'
      const loggedUser = await this.props.setLoggedUser(username, password)
      if (loggedUser) this.loadApp(loggedUser)
   }

   loadApp(loggedUser) {
      if (loggedUser) {
         this.props.loadContacts()
         this.props.history.push('/')
      }
   }
   // HTML
  
}

// REDUX CONFIGORATION
const mapStateToProps = state => {
   return {
      contacts: state.contacts,
   }
}

const mapDispatchToProps = { setLoggedUser, loadContacts }

export const SignupPage = connect(mapStateToProps, mapDispatchToProps)(_SignupPage)

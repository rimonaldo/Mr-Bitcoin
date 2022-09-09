import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setLoggedUser } from '../store/actions/userActions'
export class _SignupPage extends Component {
   state = {
      username: '',
      password: '',
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
      if (loggedUser) this.props.history.push('/')
   }

   async onLogin() {
      const { username, password } = this.state
      console.log(username, password)
      if (!username || !password) return
      const loggedUser = await this.props.setLoggedUser(username, password)
      if (loggedUser) this.props.history.push('/')
   }

   // HTML
   render() {
      return (
         <div className="signup-page">
            <div className="hero">
               <h1>popCoin</h1>
               <p>
                  popCoin lets you watch your favourite media and video games on demand, using the power of blockchain
               </p>
               {/* <p>Get your favourite media and video games on demand</p> */}
            </div>
            <br />

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

            <div className="gallery">
               <div className="item">
                  <img src="https://pic.onlinewebfonts.com/svg/img_204358.png" alt="" />
                  <span>SAFE</span>
               </div>
               <div className="item">
                  <img src="https://cdn-icons-png.flaticon.com/512/1408/1408799.png" alt="" />
                  <span>FAST</span>
               </div>
               <div className="item">
                  <img src="https://freepngimg.com/save/148583-handshake-vector-business-free-photo/980x700" alt="" />
                  <span>RELIABLE</span>
               </div>
            </div>

            <div className="logo"></div>
            <span>Please enter your name:</span>
            <br />
            <input placeholder="username" type="text" onChange={ev => this.handleChange(ev)} name="username" />
            <button className="button" onClick={() => this.onSignup()}>
               Signup
            </button>
            <div>or</div>
            <span>Please enter existing username:</span>
            <br />
            <input placeholder="username" type="text" onChange={ev => this.handleChange(ev)} name="username" />
            <input placeholder="password" type="text" onChange={ev => this.handleChange(ev)} name="password" />
            <button className="button" onClick={() => this.onLogin()}>
               Login
            </button>
         </div>
      )
   }
}

// REDUX CONFIGORATION
const mapStateToProps = state => {
   return {
      contacts: state.contacts,
   }
}

const mapDispatchToProps = { setLoggedUser }

export const SignupPage = connect(mapStateToProps, mapDispatchToProps)(_SignupPage)

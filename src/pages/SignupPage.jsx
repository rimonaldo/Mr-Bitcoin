import React, { Component } from "react"
import { connect } from "react-redux"
import { setLoggedUser } from "../store/actions/userActions"
export class _SignupPage extends Component {
   state = {
      username: "",
   }
   componentDidMount() {}

   // ON INPUT CHANGE SET USER NAME
   async handleChange({ target }) {
      const field = target.name
      const value = target.type === "number" ? +target.value || "" : target.value
      this.setState(prevState => ({
         [field]: value,
      }))
   }

   // DISPATCH SET LOGGED USER
   async onSignup() {
      const name = this.state.username
      if (!name) return
      const loggedUser = await this.props.setLoggedUser(name)
      if (loggedUser) this.props.history.push("/")
   }

   // HTML
   render() {
      return (
         <div>
            <div className="logo"></div>
            <span>Please enter your name:</span>
            <br />
            <input type="text" onChange={ev => this.handleChange(ev)} name="username" />
            <button className="button" onClick={() => this.onSignup()}>
               Sign up
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

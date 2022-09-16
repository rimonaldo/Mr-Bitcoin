import React from 'react'
import { contactService } from '../../services/contact.service'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeContact } from '../../store/actions/contactActions'
import { sendCoins, saveUser } from '../../store/actions/userActions'
import { Moves } from '../../cmps/Moves'

export class _ContactDetailsPage extends React.Component {
   state = {
      contact: null,
      amount: 0,
   }

   // SET CONTACT FROM URL PARAMS
   async componentDidMount() {
      const contactId = this.props.match.params.id
      const contact = await contactService.getContactById(contactId)
      this.setState({ contact })
   }

   removeContact = () => {
      const confirmation = window.confirm('this will remove contact perminantly, continue?')
      if (!confirmation) return
      this.props.removeContact(this.state.contact._id)
      this.goBack()
   }

   goBack = () => {
      this.props.history.push('/contact')
   }

   onSendCoins = async ev => {
      ev.preventDefault()
      const { amount } = this.state
      const to = this.state.contact
      await this.props.sendCoins(amount, to)
      const userToUpadte = this.props.user
      this.props.saveUser(userToUpadte)
   }

   handleChange({ target }) {
      const field = target.name
      const value = target.type === 'number' ? +target.value || '' : target.value
      this.setState(prevState => ({ [field]: value }))
   }

   getMovesToContact() {
      const { contact } = this.state
      const { user } = this.props
      let moves = user.moves
      if (!moves) return []
      return moves.filter(move => {
         return move.to._id === contact._id
      })
   }

   render() {
      const { contact } = this.state
      const { rate } = this.props
      if (!contact) return <div>loading...</div>
      return (
         <section className="contact-details container">

            <header>
               <a onClick={this.goBack}>Back</a>
               <Link to={`/contact/edit/${contact._id}`}>
                  <span>Edit</span>
               </Link>
            </header>

            <div className="info">
               <div className="avatar"></div>
               <div className="name">{contact.name}</div>
            </div>

            <form className="send-coins">
               <input type="text" name="amount" onChange={ev => this.handleChange(ev)} />
               <button onClick={ev => this.onSendCoins(ev)}>Transfer</button>
            </form>

            <div className="moves">
               <Moves moves={this.getMovesToContact()} rate={rate} />
            </div>
         </section>
      )
   }
}

// REDUX CONFIGORATION
const mapStateToProps = state => {
   return {
      user: state.userModule.loggedUser,
      contacts: state.contactModule.contacts,
      rate: state.tokenModule.rate,
   }
}
const mapDispatchToProps = { removeContact, sendCoins, saveUser }
export const ContactDetailsPage = connect(mapStateToProps, mapDispatchToProps)(_ContactDetailsPage)

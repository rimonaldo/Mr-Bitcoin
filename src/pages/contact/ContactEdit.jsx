import { Component, createRef } from 'react'
import { contactService } from '../../services/contactService'
import { Link } from 'react-router-dom'
export class ContactEdit extends Component {
   state = {
      contact: null,
   }

   inputRef = createRef()

   async componentDidMount() {
      const contactId = this.props.match.params.id
      let contact
      contactId
         ? (contact = await contactService.getContactById(contactId))
         : (contact = contactService.getEmptyContact())
      this.setState({ contact }, () => {
         this.inputRef.current.focus()
      })
   }

   handleChange({ target }) {
      const field = target.name
      const value = target.type === 'number' ? +target.value || '' : target.value
      this.setState(prevState => ({
         contact: { ...prevState.contact, [field]: value },
      }))
   }

   saveContact = async ev => {
      ev.preventDefault()
      let contact = this.state.contact
      contact = await contactService.saveContact(contact)
      this.goBack()
   }

   goBack = () => {
      this.props.history.push('/contact')
   }

   render() {
      const { contact } = this.state
      if (!contact) return <div>Loading...</div>
      return (
         <section className="contact-edit container">
            <header className="full main">
               <Link to={`/contact/${contact._id}`}>
                  <span>Back</span>
               </Link>
            </header>

            <form>
               <input
                  ref={this.inputRef}
                  value={contact.name}
                  name="name"
                  type="text"
                  onChange={ev => this.handleChange(ev)}
                  placeholder="name"
               />
               <input
                  value={contact.phone}
                  name="phone"
                  type="tel"
                  required
                  onChange={ev => this.handleChange(ev)}
                  placeholder="phone"
               />
               <input
                  placeholder="email"
                  value={contact.email}
                  name="email"
                  type="email"
                  onChange={ev => this.handleChange(ev)}
               />
               <input
                  placeholder="wallet address"
                  value={contact.walletAddress}
                  name="walletAddress"
                  type="text"
                  onChange={ev => this.handleChange(ev)}
               />

               <button onClick={ev => this.saveContact(ev)}>Save</button>
            </form>
         </section>
      )
   }
}

import React from 'react'
import { ContactPreview } from './ContactPreview'
import { Link } from 'react-router-dom'
export class ContactList extends React.Component {
   state = {}

   componentDidMount() {
      const { contacts, user } = this.props
      // contacts
   }

   componentWillUnmount() {}

   render() {
      const { contacts, user } = this.props

      return (
         <section className="contacts">
            <div className="add">
               <Link to="/contact/edit">
                  <button className="fa-s"></button>
               </Link>
            </div>
            {contacts
               .filter(c => c._id !== user._id)
               .map(contact => (
                  <ContactPreview key={contact._id} contact={contact} />
               ))}
         </section>
      )
   }
}

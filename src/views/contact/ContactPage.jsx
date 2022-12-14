import React from 'react'
import { contactService } from '../../services/contact.service'
import { ContactList } from '../../cmps/ContactList'
import { connect } from 'react-redux'
import { userService } from '../../services/user.service'
import { loadContacts, removeContact, setFilterBy } from '../../store/actions/contactActions'
import { ContactFilter } from '../../cmps/ContactFilter'

class _ContactPage extends React.Component {
   state = {
      filterBy: null,
      txt: null,
   }

   async componentDidMount() {
      await userService.getUsers()
      // const contacts = await contactService.getContacts()
      this.props.loadContacts()
   }

   componentWillUnmount() {}

   onChangeFilter = filterBy => {
      this.props.setFilterBy(filterBy)
      this.props.loadContacts()
   }

   render() {
      const { contacts, setPage, user } = this.props
      if (!contacts) return <div>loading...</div>
      return (
         <section className="container">
            <div className="full">
               <ContactFilter onChangeFilter={this.onChangeFilter} />
            </div>
            {contacts.length ? <ContactList contacts={contacts} user={user} /> : ''}
         </section>
      )
   }
}

const mapStateToProps = state => {
   return {
      contacts: state.contactModule.contacts,
      user: state.userModule.loggedUser,
   }
}

const mapDispatchToProps = {
   loadContacts,
   setFilterBy,
}

export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage)

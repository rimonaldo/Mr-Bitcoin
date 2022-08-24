import React from "react";
import { ContactPreview } from "./ContactPreview";
import {Link} from 'react-router-dom'
export class ContactList extends React.Component {
  state = {};

  componentDidMount() {
  }

  componentWillUnmount() {}

  render() {
    const { contacts } = this.props;
    return (
      <section className="contacts">
        <div className="add">
          <Link to='/contact/edit'>
            <button className="fa-s"></button>
          </Link>
        </div>
      {contacts.map(contact => 
        <ContactPreview key={contact._id} contact={contact} />
      )}
      </section>
    );
  }
}



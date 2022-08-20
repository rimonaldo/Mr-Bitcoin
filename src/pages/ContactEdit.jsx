import { Component, createRef } from "react";
import { contactService } from "../services/contactService";
export class ContactEdit extends Component {
  state = {
    contact: null,
  };

  inputRef= createRef()

  async componentDidMount() {
    const contactId = this.props.match.params.id;
    let contact;
    contactId
      ? (contact = await contactService.getContactById(contactId))
      : (contact = contactService.getEmptyContact());
    console.log(contact);
    this.setState({ contact }, () => {
      this.inputRef.current.focus();
    });
  }

  handleChange({ target }) {
    const field = target.name;
    const value = target.type === "number" ? +target.value || "" : target.value;
    this.setState((prevState) => ({
      contact: { ...prevState.contact, [field]: value },
    }));
  }

  saveContact = async (ev) => {
    ev.preventDefault();
    let contact = this.state.contact;
    contact = await contactService.saveContact(contact);
    this.goBack()
  };

  goBack = () => {
    this.props.history.push("/contact");
  };

  render() {
    const { contact } = this.state;
    if (!contact) return <div>Loading...</div>;
    return (
      <section className="contact-edit">
        <h1>{contact._id ? "Edit" : "Add"}</h1>

        <form>
          <input
            ref={this.inputRef}
            value={contact.name}
            name="name"
            type="text"
            onChange={(ev) => this.handleChange(ev)}
          />
          <input
            value={contact.phone}
            name="phone"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            onChange={(ev) => this.handleChange(ev)}
          />
          <input
            value={contact.email}
            name="email"
            type="email"
            onChange={(ev) => this.handleChange(ev)}
          />
          <button onClick={(ev) => this.saveContact(ev)}>Save</button>
        </form>
      </section>
    );
  }
}

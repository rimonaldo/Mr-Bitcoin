import React from "react";
import { contactService } from "../../services/contactService";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeContact } from "../../store/actions/contactActions";
import { sendCoins,saveUser } from "../../store/actions/userActions";
export class _ContactDetailsPage extends React.Component {
  state = {
    contact: null,
    amount:0
  };

  // SET CONTACT FROM URL PARAMS
  async componentDidMount() {
    const contactId = this.props.match.params.id;
    const contact = await contactService.getContactById(contactId);
    this.setState({ contact });
  }

  removeContact = () => {
    const confirmation = window.confirm(
      "this will remove contact perminantly, continue?"
    );
    if (!confirmation) return;
    this.props.removeContact(this.state.contact._id);
    this.goBack();
  };

  goBack = () => {
    this.props.history.push("/contact");
  };

  onSendCoins = async (ev) => {
    ev.preventDefault()
    const {amount} = this.state
    const to = this.state.contact
    await this.props.sendCoins(amount,to);
    const userToUpadte = this.props.user 
    this.props.saveUser(userToUpadte)
  };

  handleChange({ target }) {
    const field = target.name;
    const value = target.type === "number" ? +target.value || "" : target.value;
    this.setState((prevState) => ({ [field]: value }));
  }


  signup = () =>{
    this.props.history.push("/signup");
  }
  render() {
    const { contact } = this.state;
    if (!contact) return <div>loading...</div>;
    return (
      <section className="contact-details container">
        <header className="full">
          <span onClick={this.goBack}>Back</span>
          <Link to={`/contact/edit/${contact._id}`}>
            <span>Edit</span>
          </Link>
        </header>

        <div className="avatar"></div>

        <form className="send-coins">
          <input type="text" name='amount' onChange={(ev)=> this.handleChange(ev)} />
          <button onClick={(ev) => this.onSendCoins(ev)}>SEND</button>
          <button onClick={this.removeContact}>Delete</button>
          <button onClick={this.signup}>signup</button>
        </form>
      </section>
    );
  }
}

// REDUX CONFIGORATION
const mapStateToProps = (state) => {
  return {
    user: state.userModule.loggedUser,
  };
};

const mapDispatchToProps = { removeContact, sendCoins, saveUser };

export const ContactDetailsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactDetailsPage);

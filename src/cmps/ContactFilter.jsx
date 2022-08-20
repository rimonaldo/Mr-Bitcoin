import { Component } from "react";

export class ContactFilter extends Component {
  state = {
    txt: "",
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "number" ? +target.value || "" : target.value;
    this.setState({ [field]: value }, () => {
      this.props.onChangeFilter({ ...this.state });
    });
    
  };

  render() {
    return(
        <input className="contact-filter" placeholder="Search" type="text" onChange={this.handleChange} name="term" />
    );
  }
}

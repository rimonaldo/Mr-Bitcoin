import React from "react";
import {NavLink} from 'react-router-dom'
export class Header extends React.Component {
  state = {};

  intervalId;
  componentDidMount() {
  }

  componentWillUnmount() {}

  toggleDark = () => {

  };

  render() {
    const {setPage} = this.props
    return (
      <section className="header full" >
        <NavLink exact to='/'><div className="logo">Mr.popCoin</div></NavLink>
       <div className="links">
       <NavLink to='/miner'><div className="miner-hub-link fa-s"></div></NavLink>
        <NavLink to='/contact'><div className="contacts-link fa-s"></div></NavLink>
       </div>
      </section>
    );
  }
}


// if no props.history
// Router functionnality add -->
// export const Header = withRouter(_Header)

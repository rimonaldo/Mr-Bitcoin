import React from 'react'
import { NavLink } from 'react-router-dom'
import { PrivateKey } from './PrivateKey'
export class Header extends React.Component {
   state = {
      isKeyShown: false,
   }

   intervalId
   componentDidMount() {}

   componentWillUnmount() {}

   toggleDark = () => {}

   keyIsShown = () => {
      const state = this.state.isKeyShown
      this.setState({ isKeyShown: !state })
   }

   render() {
      const { setPage } = this.props
      return (
         <section className="header ">
            <div className="right">
               <NavLink exact to="/" title="home">
                  <div
                     className="logo"
                     style={{
                        backgroundImage:
                           'url(https://www.clipartmax.com/png/full/4-44076_irish-clipart-gold-coin-gold-coins-st-patricks-day.png)',
                     }}
                  ></div>
               </NavLink>

               <NavLink title="swith user" exact to="/signup" className={'fa-s login'}></NavLink>
            </div>
            <div className="links">
               <NavLink to="/miner" title="miner-hub">
                  <div className="miner-hub-link fa-s"></div>
               </NavLink>

               <NavLink to="/contact" title="contacts">
                  <div className="contacts-link fa-s"></div>
               </NavLink>

               <div className="key-menu fa-s" title="private key" onClick={this.keyIsShown}>
                  {this.state.isKeyShown ? (
                     <div className="wraper" onClick={ev => ev.stopPropagation()}>
                        <PrivateKey />
                     </div>
                  ) : (
                     ''
                  )}
               </div>
            </div>
         </section>
      )
   }
}

// if no props.history
// Router functionnality add -->
// export const Header = withRouter(_Header)

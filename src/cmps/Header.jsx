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
         <section className="header full">
            <NavLink exact to="/">
               <div className="logo">Mr.popCoin</div>
            </NavLink>

            <div className="links">
               <NavLink to="/miner">
                  <div className="miner-hub-link fa-s"></div>
               </NavLink>

               <NavLink to="/contact">
                  <div className="contacts-link fa-s"></div>
               </NavLink>

               <div className="key-menu fa-s" onClick={this.keyIsShown}>
                  {this.state.isKeyShown ? (
                     <div className='wraper' onClick={ev => ev.stopPropagation()}>
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

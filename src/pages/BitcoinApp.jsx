import { Component } from 'react'
import '../assets/scss/global.scss'
import { HomePage } from './HomePage'
import { Header } from '../cmps/Header'
import { ContactPage } from './contact/ContactPage'
import { ContactDetailsPage } from './contact/ContactDetails'
import { setLoggedUser } from '../store/actions/userActions'
import { MinerHub } from './MinerHubPage'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { SignupPage } from './LandingPage'
import { ContactEdit } from './contact/ContactEdit'
import { connect } from 'react-redux'

const PrivateRoute = props => {
   const user = props.user
   return user ? <Route {...props} /> : <Redirect to="/signup" />
}

class _BitcoinApp extends Component {
   async componentDidMount() {}

   componentDidUpdate(prevProps) {
      if (prevProps.user !== this.props.user) {
         console.log('changed user', this.props.user.username)
      }
   }

   render() {
      return (
         <Router>
            <div>
               <Header />
               <Switch>
                  <Route path="/contact/edit/:id?" component={ContactEdit} />
                  <PrivateRoute path="/contact/:id" component={ContactDetailsPage} />
                  <PrivateRoute path="/contact" component={ContactPage} />
                  <Route path="/signup" component={SignupPage} onSignup={this.onSignup} />
                  <PrivateRoute path="/miner" component={MinerHub} user={this.props.user} />
                  <PrivateRoute path="/" component={HomePage} user={this.props.user} />
               </Switch>
            </div>
         </Router>
      )
   }
}

// REDUX CONFIGORATION
const mapStateToProps = state => {
   return {
      user: state.userModule.loggedUser,
   }
}
const mapDispatchToProps = { setLoggedUser }
export const BitcoinApp = connect(mapStateToProps, mapDispatchToProps)(_BitcoinApp)

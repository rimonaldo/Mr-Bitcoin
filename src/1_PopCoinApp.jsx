import { Component } from 'react'
// import '../styles/scss/global.scss'
import { AppPage } from './views/HomeView'
import { Header } from './cmps/Header'
import { ContactPage } from './views/contact/ContactPage'
import { ContactDetailsPage } from './views/contact/ContactDetails'
import { setLoggedUser } from './store/actions/userActions'
import { MinerHub } from './views/MinerHubPage'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { SignupPage } from './views/LandingPage'
import { ContactEdit } from './views/contact/ContactEdit'
import { connect } from 'react-redux'

const PrivateRoute = props => {
   const user = props.user
   return user ? <Route {...props} /> : <Redirect to="/signup" />
}

class _BitcoinApp extends Component {

   render() {
      return (
         <Router>
            <div>
               <Header />
               <Switch>
                  <Route path="/contact/edit/:_id?" component={ContactEdit} />
                  <Route path="/contact/:_id" component={ContactDetailsPage} />
                  <Route path="/contact" component={ContactPage} />
                  <Route path="/signup" component={SignupPage} onSignup={this.onSignup} />
                  <Route path="/miner" component={MinerHub} user={this.props.user} />
                  <Route path="/" component={AppPage} user={this.props.user} />
               </Switch>
            </div>
         </Router>
      )
   }

   async componentDidMount() {}

   componentDidUpdate(prevProps) {
      if (prevProps.user !== this.props.user) {
         console.log('changed user', this.props.user.username)
      }
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

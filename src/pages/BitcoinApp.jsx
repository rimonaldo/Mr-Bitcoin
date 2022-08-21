import { Component } from "react";
import "../assets/scss/global.scss";
import { HomePage } from "./HomePage";
import { Header } from "../cmps/Header";
import { ContactPage } from "./contact/ContactPage";
import { ContactDetailsPage } from "./contact/ContactDetailsPage";
import { setLoggedUser } from "../store/actions/userActions";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { SignupPage } from "./SignupPage";
import { ContactEdit } from "./contact/ContactEdit";
import { connect } from "react-redux";
import { userService } from "../services/userService";
const PrivateRoute = (props) => {
  const user = props.user;
  const isAdmin = true;
  return isAdmin ? <Route {...props} /> : <Redirect to="/contact" />;
};

const AuthRoute = (props) => {
  const user = JSON.parse(sessionStorage.getItem("loggedUser"));
  return user ? <Route {...props} /> : <Redirect to="/signup" />;
};

class _BitcoinApp extends Component {
  async componentDidMount() {
    const loggedUser = await this.props.user
    console.log(loggedUser.name);
    // this.props.setLoggedUser(loggedName)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      console.log("changed user",this.props.user);

    }
  }
  

  loggedUser(){
    return JSON.parse(sessionStorage.getItem("loggedUser"))
  }
  // HTML
  render() {
    return (
      <Router>
        <div >
          <Header />
          <Switch>
            <Route path="/contact/edit/:id?" component={ContactEdit} />
            <PrivateRoute path="/contact/:id" component={ContactDetailsPage} />
            <AuthRoute path="/contact" component={ContactPage}/>
            <Route
              path="/signup"
              component={SignupPage}
              onSignup={this.onSignup}
            />
            <AuthRoute path="/" component={HomePage} user={this.props.user} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.userModule.loggedUser,
  };
};

const mapDispatchToProps = { setLoggedUser };

export const BitcoinApp = connect(mapStateToProps,mapDispatchToProps)(_BitcoinApp);

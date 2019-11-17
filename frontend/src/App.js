import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import {connect} from 'react-redux'
import Todo from './components/todo/todo';
import Login from './components/login/login';




function App(props) {


const AuthRoute = () => {
    if(authUser())
    return (<Route
            exact 
            path="/" 
            render = {props => <Todo {...props} />}
    />)        
    return (<Redirect to="/login"/>)
}

function authUser() {
  let token = localStorage.getItem('token')
  let userName = localStorage.getItem('userName');
  let lastLogin = localStorage.getItem('lastLogin');
  if(token && userName) {
    props.dispatch({type: 'USER', user : {userName : userName, lastLogin: lastLogin}})
    return true
  }
  return false

}

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route 
          path = '/login'
          render = {props => <Login {...props} />}
          />
          <AuthRoute />
        </Switch>
      </Router>
    </div>
  );
}


const mapStateToProps = state => ({ user : state.user })

export default connect(
    mapStateToProps,
)(App)

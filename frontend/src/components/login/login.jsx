import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import axios from 'axios'
import BASE_URL from '../../config/config';

class Login extends Component {


    state = {
      wait : false
     }

    componentDidMount() {
    }


    handleSubmit = (event) => {
      this.setState({wait : true})
      event.preventDefault()
      console.log(event)
      console.log(event.target.email.value)
      console.log(event.target.password.value)
      console.log(this.props)

      let loginData = {
        username : event.target.email.value,
        password : event.target.password.value
      }

      axios.post( BASE_URL + '/account/api/login',loginData)
      .then(res => {
        if(res.data && res.data.token) {
          this.props.dispatch({type:'USER', user : {userName : loginData.username}})
          localStorage.setItem('token',res.data.token)
          localStorage.setItem('userName',loginData.username)


          this.props.history.push('/')
        
        }
        else{
          alert('login failed')
          this.setState({wait:false})
        }
      })
    }

    render() { 
        return ( 

    <div style={{height:'100vh',backgroundColor:'#eee'}}>

    <MDBContainer >
      <MDBRow>
        <MDBCol md="6" className="p-4" style={{margin:'auto',backgroundColor:'white',marginTop:'10vh'}}>
          <form onSubmit = {this.handleSubmit}>
              <p className="h5 text-center mb-5"><h3>Sign in</h3></p>
            <div className="grey-text">
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
                error="wrong"
                success="right"
                name="email"
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
                name="password"
              />
            </div>
            <div className="text-center">
            <button class="btn btn-primary" type="submit" disabled={this.state.wait} style={{width:120}}>
              {this.state.wait ?
              
              <React.Fragment>
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span>
              </React.Fragment>
             :
              'Sign In'
             }
          </button>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>


    </div>
         );
    }
}
 
const mapStateToProps = state => {
    console.log(state)
    const {user}=state.userReducer
    return   {user}
}
export default connect(mapStateToProps)(Login) 


import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from './utils/Auth';

class Login extends Component {
  state = {
    email: 'foo@bar.io',
    password: 'mypassword',
    success: false
  }

  componentWillMount = async () => {
    await Auth.authenticate()
    if(Auth.isAuthenticated){
      console.log('authed!');
      await this.setState({success: true})
    }
  }

  handleChange = (event) => {
    const key = event.target.className
    const stateObj = Object.assign({}, this.state)
    stateObj[key] = event.target.value
    this.setState(stateObj)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const data = this.state
    fetch(`http://localhost:3001/api/login`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: new Headers({
    		'Content-Type': 'application/json'
    	})
    })
      .then(res => res.ok ? res.json() : res.json().then(error => {throw error}))
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.token)
        this.setState({success: res.success})
      })
      .catch(err => {
        console.log(err);
      })

  }
  render(){
    return(
      <div>
        { this.state.success ? <Redirect to="/products" />
        :
        <form>
          <label>email</label>
          <input className='email' type='text' value={this.state.email} onChange={this.handleChange}/>
          <label>password</label>
          <input className='password' type='text' value={this.state.password} onChange={this.handleChange}/>
          <button onClick={this.handleSubmit}> Login </button>
        </form>
      }
      </div>
    )
  }
};

export default Login;

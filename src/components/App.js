import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Login from './Login';
import Products from './Products';
import Home from './Home';
import AuthenticatedRoute from './utils/AuthenticatedRoute';
import Auth from './utils/Auth';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/">Home<span> | </span></Link>
        <Link to='/products'>Products<span> | </span></Link>
        <Link to='/sign-out' onClick={Auth.signout}>Sign Out</Link>

        <Route exact path='/' component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/sign-out" render={() => <h3> You've been Signed Out</h3>}/>
        <AuthenticatedRoute path="/products" component={Products}/>

      </div>
    );
  }
}

export default App;

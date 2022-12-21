/**
 * Created by cshao on 2022/12/20.
 */

'use strict';

import axios from 'axios';
import {ChangeEvent, FormEvent} from 'react';

const React = require('react');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onUsernameChange(e: ChangeEvent) {
    this.setState({
      username: e.target.value
    });
  }

  onPasswordChange(e: ChangeEvent) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e: FormEvent) {
    e.preventDefault();
    axios.post('/api/login', {
      username: this.state.username.trim(),
      password: this.state.password.trim()
    }).then((res)=>{
      console.log(res);
    }).catch((error)=>{
      alert(error.message);
    });
  }

  render() {
    return (
      <form noValidate='noValidate' onSubmit={(e)=>this.onSubmit(e)}>
        <input
          required
          placeholder='Username'
          type='text'
          name='username'
          value={this.state.username}
          onChange={(e)=>this.onUsernameChange(e)} />
        <input
          required
          placeholder='Password'
          type='password'
          name='password'
          value={this.state.password}
          onChange={(e)=>this.onPasswordChange(e)} />
        <input type='submit' value='Login'/>
      </form>
    );
  }
}

export default Login;
import React from 'react';
import api from '../services/api';

 
class Login extends React.Component {
  state = {
      error: false,
      fields: {
        email: '',
        password: ''
      }
    }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    api.auth
      .login(this.state.fields.email, this.state.fields.password)
      .then(res => {
        // debugger
        if (res.error) {
          this.setState({ error: true });
        } else {
         
          const {id, first_name, last_name, email, avatar, cell_number} = res.user.data.attributes
          const newUser = {user: {id, first_name, last_name, avatar, email, cell_number}, token: res.token }
          this.props.handleLogin(newUser);
          this.props.history.push('/');
        }
      });
  };

  render() {
    const { fields } = this.state;
    return (
      <div>
        {this.state.error ? <h1>Try Again</h1> : null}
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Email</label>
              <input
                name="email"
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
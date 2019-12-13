import React from 'react';
import api from '../services/api';

class NewUser extends React.Component {
  state = {
    error: false,
    fields: {
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
      cell_number: '',
      password: ''
    }
  };

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    const { first_name, last_name, email, avatar, cell_number, password } = this.state.fields
    
    e.preventDefault();
    api.auth
      .create(first_name, last_name, email, avatar, cell_number, password)
      .then(res => {
        
        if (res.error) {
          this.setState({ error: true });
        } else {
          debugger
          const { id, first_name, last_name, email, avatar, cell_number } = res.user.data.attributes
          const newUser = { user: { id, first_name, last_name, email, avatar, cell_number }, token: res.token }
          this.props.handleLogin(newUser);
          this.props.history.push('/');
        }
      });

  };

  render() {
    const { fields } = this.state;
    return (
      <div>


        <div>

          <h2>SIGN UP</h2>
          {this.state.error ? <h1>Try Again</h1> : null}
          <div>
            <form onSubmit={this.handleSubmit}>

              <div>
                <label>Full Name</label><br />
                <input
                  name="first_name"
                  placeholder="Enter First Name"
                  onChange={this.handleChange}
                />
                <input
                  name="last_name"
                  onChange={this.handleChange}
                />
              </div>
              <br />
              <div>
                <label>Email</label><br />
                <input
                  name="email"
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Avatar</label><br />
                <input
                  name="avatar"
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Cell Number</label><br />
                <input
                  name="cell_number"
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Password</label><br />
                <input
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                />
              </div>
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewUser;
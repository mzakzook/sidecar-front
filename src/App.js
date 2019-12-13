import React, { Fragment } from 'react';
import api from './services/api';
import Login from './components/Login';
import { Route, Switch, withRouter } from 'react-router-dom';
import NewUser from './components/NewUser'


class App extends React.Component {
  state = {
    auth: { currentUser: {} }
  };

  componentDidMount() {
    // console.log('CDM in APP');
    const token = localStorage.getItem('token');
    if (token) {
      api.auth.getCurrentUser().then(user => {
        
        const currentUser = { currentUser: user };


        this.setState({ auth: currentUser });

      });

    }

  }

  handleLogin = user => {
    const currentUser = {user: user.user};
    
    localStorage.setItem('token', user.token);

    this.setState({ auth: { currentUser } });
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({
      auth: { currentUser: {} }
    });
    this.props.history.push('/')
  };


  render() {

    return (
      <Fragment>

        <Switch>
          <Route
            path="/login"
            render={routerProps => {
              return (
                <Fragment>
                  <Login {...routerProps} handleLogin={this.handleLogin} />
                </Fragment>

              );
            }}
          />

          <Route path="/signup" render={routerProps => {
            return (
              <Fragment>
                <NewUser {...routerProps} handleLogin={this.handleLogin} />
              </Fragment>
            );
          }}
          />
        </Switch>

      </Fragment>


    );
  }

}


export default withRouter(App);




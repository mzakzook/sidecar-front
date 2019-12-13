const API_ROOT = `http://localhost:3001/api/v1`;
const token = localStorage.getItem('token');

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json',
  Authorization: token
};


const create = (first_name, last_name, email, avatar, cell_number, password) => {
  let user = {
    user: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      avatar: avatar,
      cell_number: cell_number,
      password: password
    }
  }
  
  return fetch(`${API_ROOT}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
    },
    body: JSON.stringify(
      user
    )
  })
    .then(resp => resp.json())
}

const login = (email, password) => {
  return fetch(`${API_ROOT}/auth/`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      user: {
        email,
        password
      }
    })
  }).then(res => res.json())

};

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`, {
    headers: headers
  }).then(res => res.json());
};

export default {
  auth: {
    create,
    login,
    getCurrentUser
  }
};

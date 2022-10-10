import { api } from './api'

class Users {
  fetchUsers() {
    return api.client.get('users/')
  }
}

const users = new Users

export { users }
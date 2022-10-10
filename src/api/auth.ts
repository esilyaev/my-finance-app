import { useAuthStore } from '../stores/store_auth';
import { api } from './api'

class Auth {
  logout() {
    const auth_store = useAuthStore()
    auth_store.token = null
    auth_store.refresh = null
    window.location.replace('/login')
  }

  login(username: string, password: string) {
    const data = { username, password };

    api.client.post('token/', data)
      .then((res) => {
        const store = useAuthStore()
        store.token = res.data.access
        store.refresh = res.data.refresh
      })
      .catch(e => console.log(e))
  }

}
export default new Auth()
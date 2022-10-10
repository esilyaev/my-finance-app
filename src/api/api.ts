import axios, { AxiosInstance } from 'axios'
import { useAuthStore } from '../stores/store_auth';


class Api {
  client: AxiosInstance
  isRefreshing: any
  /**
   *
   */
  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 1000,
    })
    this.isRefreshing = null
  }
}

const api = new Api()

api.client.interceptors.request.use(
  config => {
    const auth_store = useAuthStore()
    if (!auth_store.token) {
      return config;
    }

    const newConfig = {
      headers: {},
      ...config,
    };

    newConfig.headers.Authorization = `Bearer ${auth_store.token}`;
    return newConfig;
  },
  e => Promise.reject(e)
)

api.client.interceptors.response.use(
  r => r,
  async error => {
    const store = useAuthStore()
    if (
      !store.token ||
      error.response.status !== 401 ||
      error.config.retry
    ) {
      throw error;
    }

    if (!api.isRefreshing) {
      api.isRefreshing = api.client.post("/token/refresh/", {
        refresh: store.refresh,
      });
    }
    const { data } = await api.isRefreshing;
    store.token = data.access
    store.refresh = data.refresh;
    const newRequest = {
      ...error.config,
      retry: true,
    };

    return api.client(newRequest);
  }
)

export { api }
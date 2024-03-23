import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { toast } from 'vue3-toastify'

const api: AxiosInstance = axios.create({
  baseURL: 'https://teste-backend-copybase.vercel.app/api',
  headers: {
    Accept: 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    if (error.response) {
      console.error('Erro de resposta do servidor:', error.response.status)
    } else if (error.request) {
      console.error('Erro de solicitação:', error.request)
    } else {
      console.error('Erro ao processar solicitação:', error.message)
    }

    toast.error(error.response.data.message, {
      position: toast.POSITION.BOTTOM_RIGHT
    })

    return Promise.reject(error)
  }
)

export { api }

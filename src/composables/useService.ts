import { api } from '@/services/axios'
import { Status } from '@/types/enum/status'

export default function useService() {
  const uploadFile = async (file: FormData) => {
    const response = await api.post('/upload', file)
    return response.data
  }

  const getMetrics = async (start: string, end: string) => {
    const response = await api.get(`/metrics?start=${start}&end=${end}`)
    return response.data
  }

  const getBillings = async (page: number, status?: Status) => {
    let url = `/listing?page=${page}`

    if (status !== undefined && status.length > 0) {
      url += `&status=${status}`
    }

    const response = await api.get(url)
    return response.data
  }

  return {
    uploadFile,
    getMetrics,
    getBillings
  }
}

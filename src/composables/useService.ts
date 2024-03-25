import { api } from '@/services/axios'
import { Status } from '@/types/enum/status'
import { useAsyncState } from '@vueuse/core'

export default function useService() {
  const uploadFile = async (file: FormData) => {
    const response = await api.post('/upload', file)
    return response.data
  }

  const getMetrics = async (start: string, end: string) => {
    const { state, isReady, isLoading } = useAsyncState(
      api.get(`/metrics?start=${start}&end=${end}`).then((t) => t.data),
      { id: null }
    )
    return { state, isReady, isLoading }
  }

  const getBillings = async (page: number, status?: Status) => {
    let url = `/listing?page=${page}`

    if (status !== undefined && status.length > 0) {
      url += `&status=${status}`
    }

    const { state, isReady, isLoading } = useAsyncState(
      api.get(url).then((t) => t.data),
      { id: null }
    )
    return { state, isReady, isLoading }
  }

  return {
    uploadFile,
    getMetrics,
    getBillings
  }
}

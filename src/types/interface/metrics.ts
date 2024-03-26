import { Records } from './records'

export interface Metrics {
  churn: {
    total: number
  }
  records: Records[]
  total: string
}

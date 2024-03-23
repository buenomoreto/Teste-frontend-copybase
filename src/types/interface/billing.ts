import { Status } from '../enum/status'

export interface Billing {
  quantity: number
  chargedIntervalDays: number
  start: string | Date
  status: Status
  statusDate: string | Date
  cancellationDate: string | Date | null
  amount: number
  nextCycle: string | Date | null
  userId: string
}

import { Billing } from './billing'

export interface Listing {
  billings: Billing[]
  currentPage: string
  itemsPerPage: number
  total: number
  numberOfPages: number
}

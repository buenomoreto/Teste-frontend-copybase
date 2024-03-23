import { ComputedRef, computed } from 'vue'

export function useCurrencyFormatter(value: number): ComputedRef<string> {
  const formattedNumber = computed(() => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    return formatter.format(value)
  })

  return formattedNumber
}

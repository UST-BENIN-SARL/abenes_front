export const useFormatPrice = () => {
  function formatPrice(amount: number | null | undefined) {
    if (amount === null || amount === undefined) {
      return '-'
    }

    return Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF' }).format(amount)
  }

  return {
    formatPrice
  }
}

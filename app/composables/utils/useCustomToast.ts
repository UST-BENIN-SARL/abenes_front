import { toast } from 'vue3-toastify'

export const useCustomToast = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' = 'info'
) => {
  return {
    permanant: () => {
      toast(message, {
        type: type,
        autoClose: false,
        closeOnClick: true,
        position: 'top-right'
      })
    },
    temporary: () => {
      toast(message, {
        type: type,
        autoClose: 3000,
        closeOnClick: true,
        position: 'top-right'
      })
    },
    custom: (options: any) => {
      toast(message, options)
    }
  }
}

import { toast } from 'react-toastify'

export const createNotification = (type, message) => {
  toast.configure({
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  })
  switch (type) {
    case 'success':
      toast.success(message)
      return
    case 'warn':
      toast.warn(message)
      return
    case 'error':
      toast.error(message)
      return
    case 'info':
      toast.info(message)
      return
    default:
      toast(message)
  }
}

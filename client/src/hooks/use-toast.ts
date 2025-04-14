import { toast, type ToastProps } from "../components/ui/toast"
import { useToastContext } from "../components/ui/toast-context"

export function useToast() {
  const { addToast, removeToast } = useToastContext()

  return {
    toast: (props: ToastProps) => {
      const toastElement = toast(props)
      addToast(toastElement)
      return toastElement
    },
    dismiss: () => {
      removeToast(0) // Remove the first toast
    },
  }
}

export type { ToastProps }
export type { ToastActionElement } from "../components/ui/toast" 
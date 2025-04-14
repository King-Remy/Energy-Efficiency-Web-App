import * as React from "react"
import { ToastProvider, ToastViewport } from "./toast"

export const ToastContext = React.createContext<{
  toasts: React.ReactNode[]
  addToast: (toast: React.ReactNode) => void
  removeToast: (index: number) => void
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
})

export function ToastContextProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<React.ReactNode[]>([])

  const addToast = React.useCallback((toast: React.ReactNode) => {
    setToasts((prev) => [...prev, toast])
  }, [])

  const removeToast = React.useCallback((index: number) => {
    setToasts((prev) => prev.filter((_, i) => i !== index))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <ToastProvider>
        {children}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

export const useToastContext = () => React.useContext(ToastContext) 
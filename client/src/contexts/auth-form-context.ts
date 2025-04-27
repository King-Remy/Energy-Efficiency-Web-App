import { createContext } from "react"
import { AuthFormContextType } from "@/types/auth"

export const AuthFormContext = createContext<AuthFormContextType>({
  register: null,
  errors: {}
}) 
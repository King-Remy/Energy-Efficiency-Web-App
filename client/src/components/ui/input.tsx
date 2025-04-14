import * as React from "react"
import { cn } from "@/lib/utils"
import { AuthFormContext, Inputs } from "@/views/authentication/auth-forms/AuthLogin"
import { Validate } from "react-hook-form"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string;
  className?: string;
  name: keyof Inputs;
  validate?: Validate<string | boolean, Inputs>
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, name, type, validate }, _ref) => {

    const { register, errors } = React.useContext(AuthFormContext)
    
    if (!register) return null

    return (
      <div className="relative">
        <input
          id={id}
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...(register(name, {
            required: true,
            validate,
          })
          )}
        />
        {errors[name]?.type === "required" && <p className="text-red-600">This field is required</p>}
        {errors[name]?.type === "validate" && <p className="text-red-600">{errors[name]?.message}</p>}
      </div>
      
    )
  }
)
Input.displayName = "Input"

export { Input } 
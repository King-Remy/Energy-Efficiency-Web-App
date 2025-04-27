import * as React from "react"
import { cn } from "@/lib/utils"
import { Inputs } from "@/types/auth"
import { AuthFormContext } from "@/contexts/auth-form-context"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string;
  className?: string;
  name: keyof Inputs;
  rules?: {
    required?: boolean | string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    validate?: (value: any) => boolean | string;
  };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, name, type, rules }, _ref) => {
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
          {...register(name, {
            ...rules
          })}
        />
        {errors[name] && (
          <p className="text-red-600 text-sm mt-1">{errors[name]?.message}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input } 
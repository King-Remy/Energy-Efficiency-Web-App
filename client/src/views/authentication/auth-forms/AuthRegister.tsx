"use client"

import type React from "react"

import { createContext, useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form"
import { Inputs } from "./AuthLogin"


interface AuthFormContextType {
  register: UseFormRegister<Inputs> | null
}

export const AuthFormContext = createContext<AuthFormContextType>({
  register: null
})

export default function SignupForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number
    message: string
  }>({ score: 0, message: "" })

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    watch,
  } = useForm<Inputs>()

  const checkPasswordStrength = (password: string) => {


    if (password.length < 8) {"Password must be greater than 8 characters"};
    if (!/[A-Z]/.test(password)) {"Password must contain at least one uppercase letter"};
    if (!/[a-z]/.test(password)) {"Password must contain at least one lowercase letter"};
    if (!/[0-9]/.test(password)) {"Password must contain at least one number"};
    if (!/[^A-Za-z0-9]/.test(password)) {"Password must contain at least one special character"};

    return true
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Form submitted:", data)

      // Success message
      toast({
        title: "Account created!",
        description: "Your account has been created successfully. Redirecting to dashboard...",
        variant: "default",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">Start your journey towards an energy-efficient home</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthFormContext.Provider value={{ register }}>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} aria-label="Signup form" noValidate>
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="mt-1">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    label="Full Name"
                    autoComplete="name"
                    className={`${errors.name ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""}`}
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    autoComplete="email"
                    className={`${errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""}`}
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    autoComplete="new-password"
                    className={`${errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""}`}
                    validate={ () => {
                        const password = getValues("password")
                        if (password.length < 8) {"Password must be greater than 8 characters"};
                        if (!/[A-Z]/.test(password)) {"Password must contain at least one uppercase letter"};
                        if (!/[a-z]/.test(password)) {"Password must contain at least one lowercase letter"};
                        if (!/[0-9]/.test(password)) {"Password must contain at least one number"};
                        if (!/[^A-Za-z0-9]/.test(password)) {"Password must contain at least one special character"};

                        return true;
                    }}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  {watch("password") && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              passwordStrength.score <= 2
                                ? "bg-red-500"
                                : passwordStrength.score <= 4
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${Math.min(100, passwordStrength.score * 20)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{passwordStrength.message}</span>
                      </div>
                    </div>
                  )}
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600" id="password-error">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="mt-1">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    label="Confirm Password"
                    autoComplete="new-password"
                    className={`${
                      errors.confirmPassword ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="propertyOwner"
                  {...register("propertyOwner")}
                />
                <Label htmlFor="propertyOwner" className="text-sm text-gray-900">
                  I am a UK property owner
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeTerms"
                  {...register("agreeTerms", {
                    required: "You must agree to the terms and privacy policy"
                  })}
                  className={errors.agreeTerms ? "border-red-300" : ""}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="agreeTerms" className="text-sm font-medium text-gray-700">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:text-primary/90">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:text-primary/90">
                      Privacy Policy
                    </a>
                  </Label>
                  {errors.agreeTerms && <p className="text-sm text-red-600">{errors.agreeTerms.message}</p>}
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full transition-all duration-200 hover:scale-[1.02] bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>
          </AuthFormContext.Provider>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <a href="#">Sign in</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md text-center">
        <p className="text-xs text-gray-500">
          By creating an account, you agree to our data handling practices in accordance with GDPR and UK data privacy
          standards.
        </p>
      </div>
    </div>
  )
}


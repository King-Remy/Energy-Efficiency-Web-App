import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { SubmitHandler, useForm } from "react-hook-form"
import { Inputs } from "@/types/auth"
import { AuthFormContext } from "@/contexts/auth-form-context"
import useAuth from "@/hooks/useAuth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useNavigate } from "react-router-dom"

export default function SignupForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<Inputs>()
  const {signup} = useAuth()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<Inputs> = async ({username, email, password}: Inputs) => {
    setIsSubmitting(true)
    try {
        const response = await signup({username, email, password});
        console.log(response)
        toast({
          title: "Account created successfully!",
          description: "Please login with your credentials.",
          variant: "default",
        })
        navigate("/login")
    } catch (error: any) {
        setAuthError(error.response.data.msg)
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
          <AuthFormContext.Provider value={{ register, errors }}>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} aria-label="Signup form" noValidate>
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Username
                </Label>
                <div className="mt-1">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    label="Username"
                    rules={{
                      required: "Username is required"
                    }}
                    onChange={() => setAuthError("")}
                  />
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
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    }}
                    onChange={() => setAuthError("")}
                  />
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
                    rules={{
                      required: "Password is required",
                      validate: (value) => {
                        if (value.length < 8) return "Password must be greater than 8 characters";
                        if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                        if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
                        if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                        if (!/[^A-Za-z0-9]/.test(value)) return "Password must contain at least one special character";
                        return true;
                      }
                    }}
                    onChange={() => setAuthError("")}
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
                    rules={{
                      required: "Please confirm your password",
                      validate: (value) => value === getValues("password") || "Passwords do not match"
                    }}
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeTerms"
                  onCheckedChange={(checked) => {
                    register("agreeTerms").onChange({
                      target: { name: "agreeTerms", value: checked },
                    });
                  }}
                  {...register("agreeTerms", {
                    required: "You must agree to the terms and privacy policy"
                  })}
                  className={`mt-1 h-4 w-4 rounded-sm border focus:ring-2 focus:ring-blue-500 ${
                    errors.agreeTerms ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label 
                    htmlFor="agreeTerms" 
                    className={`text-sm font-medium ${
                      errors.agreeTerms ? 'text-red-500' : 'text-gray-700'
                    }`}
                  >
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:text-primary/90">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:text-primary/90">
                      Privacy Policy
                    </a>
                  </Label>
                  {errors.agreeTerms && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.agreeTerms.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting || !watch("agreeTerms")}
                  className={`w-full transition-all duration-200 hover:scale-[1.02] ${
                    !watch("agreeTerms") 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
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
              {authError && (
              <Alert
                variant="destructive"
                className="mb-6 animate-in fade-in-50 slide-in-from-top-5"
              >
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}
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
              <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
                Sign in
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


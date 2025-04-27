import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SubmitHandler, useForm } from "react-hook-form"
import { Inputs } from "@/types/auth"
import { AuthFormContext } from "@/contexts/auth-form-context"
import useAuth from "@/hooks/useAuth"

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const {login} = useAuth()
  const onSubmit: SubmitHandler<Inputs> = async ({email, password}: Inputs) => {
    try {
        const response = await login({email, password})
        console.log(response)
    } catch (error: any) {
        console.log(error)
        setAuthError(error.response.data.msg)
    }
    
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-600/5 -z-10" />
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-blue-600/5 -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-screen bg-blue-600/5 -z-10" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/5 -z-10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-600/5 -z-10 blur-3xl" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        {/* Logo and title section */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ArrowDown className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -inset-1 rounded-full bg-white/50 -z-10 blur-sm"></div>
            <div className="absolute -inset-2 rounded-full bg-blue-500/20 -z-10 blur-md"></div>
          </div>

          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
            Energy Efficiency Tracker
          </h1>
          <p className="mt-3 text-center text-sm text-gray-600 max-w-sm">
            Sign in to your account to monitor and improve your energy
            consumption
          </p>
        </div>

        {/* Login card */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {authError && (
              <Alert
                variant="destructive"
                className="mb-6 animate-in fade-in-50 slide-in-from-top-5"
              >
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}

            <AuthFormContext.Provider value={{ register, errors }}>
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    className="h-11"
                    rules={{
                        required: "Email is required"
                      }}
                    onChange={() => setAuthError("")}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Link
                      to="#"
                      className="text-xs font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    className="h-11"
                    rules={{
                        required: "Password is required"
                      }}
                    onChange={() => setAuthError("")}
                  />
                </div>

                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked as boolean)
                      }
                      className="h-4 w-4 rounded-sm border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <Label
                      htmlFor="remember-me"
                      className="text-sm text-gray-600 font-normal"
                    >
                      Remember me for 30 days
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </AuthFormContext.Provider>

          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <Button variant="outline" className="h-11">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="h-11">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </Button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors"
              >
                Create an account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 text-center text-xs text-gray-500">
        <p>© 2025 Energy Efficiency and Heat Loss Tracker. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link to="#" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
          <Link to="#" className="hover:text-gray-700 transition-colors">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}


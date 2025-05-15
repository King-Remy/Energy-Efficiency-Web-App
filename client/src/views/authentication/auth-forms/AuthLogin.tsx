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
import { useContext } from "react"
import JWTContext from "@/contexts/JWTContext"

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const {login} = useContext(JWTContext)
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setIsLoading(true);
    try {
        const response = await login(data.email, data.password)
        console.log(response)
    } catch (error: any) {
        console.log(error)
        setAuthError(error.response.data.msg)
    } finally {
        setIsLoading(false);
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


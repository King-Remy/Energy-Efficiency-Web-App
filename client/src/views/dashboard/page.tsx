"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchUserProfile } from "@/lib/store/authSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AppDispatch, RootState } from "@/lib/store"

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.username}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You are now logged in to your account. Use the sidebar to navigate through the application.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Username:</strong> {user?.username}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

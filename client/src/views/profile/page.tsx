import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Profile</h2>
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Username:</strong> {user?.username}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

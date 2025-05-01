import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth.value);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Hello, {user?.username}! Welcome to MDSec dashboard.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Security Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
              <p>All systems secure</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Last login: {new Date().toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
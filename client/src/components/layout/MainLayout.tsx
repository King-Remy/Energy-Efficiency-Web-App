import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import Header from './header';
import Sidebar from './sidebar';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} user={user} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
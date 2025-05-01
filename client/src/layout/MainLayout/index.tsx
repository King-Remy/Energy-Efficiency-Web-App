
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import NavMotion from '../NavMotion';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar drawerOpen={sidebarOpen} drawerToggle={handleSidebarToggle} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header handleSidebarToggle={handleSidebarToggle} />
        
        <main className="flex-1 overflow-auto p-6">
          <NavMotion>
            <Outlet />
          </NavMotion>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
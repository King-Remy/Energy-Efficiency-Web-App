
import { memo } from 'react';
import LogoSection from '../LogoSection';
import MenuList from './MenuList';

// ==============================|| SIDEBAR ||============================== //

const Sidebar = ({ drawerOpen }: { drawerOpen: boolean }) => {
  return (
    <div 
      className={`bg-white h-full shadow-lg transition-all duration-300 fixed md:relative z-50 
        ${drawerOpen ? 'w-64' : 'w-0 md:w-64'} overflow-hidden`}
    >
      <div className="h-full flex flex-col">
        <LogoSection />
        <div className="flex-grow overflow-auto">
          <MenuList />
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
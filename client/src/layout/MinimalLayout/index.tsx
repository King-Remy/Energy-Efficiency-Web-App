import { Outlet } from 'react-router-dom';
import NavMotion from '../NavMotion';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
  <NavMotion>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-4">
        <Outlet />
      </div>
    </div>
  </NavMotion>
);

export default MinimalLayout;
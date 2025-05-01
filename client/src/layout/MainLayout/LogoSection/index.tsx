// src/layouts/MainLayout/LogoSection/index.tsx
import { Link } from 'react-router-dom';

// ==============================|| LOGO SECTION ||============================== //

const LogoSection = () => (
  <div className="flex items-center p-4 border-b border-gray-200">
    <Link to="/dashboard">
      <div className="text-xl font-bold text-blue-600">MDSec</div>
    </Link>
  </div>
);

export default LogoSection;
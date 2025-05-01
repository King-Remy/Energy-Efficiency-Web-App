
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useAuth from '@/hooks/useAuth';

// ==============================|| HEADER ||============================== //

const Header = ({ handleSidebarToggle }: { handleSidebarToggle: () => void }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth.value);
  const { logout } = useAuth();


  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4">
      <button 
        onClick={handleSidebarToggle} 
        className="md:hidden p-2 rounded-md hover:bg-gray-100"
      >
        ☰
      </button>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user?.username?.[0].toUpperCase() || 'U'}
              </div>
              <span className="hidden md:inline">{user?.username}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
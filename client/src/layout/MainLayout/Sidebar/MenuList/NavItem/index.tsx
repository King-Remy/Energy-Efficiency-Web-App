
import { Link } from 'react-router-dom';
import { MenuChildType } from '@/menu-items/types';
import { Icons } from '@/components/ui/icons';

// ==============================|| SIDEBAR MENU ITEM ||============================== //

interface NavItemProps {
  item: MenuChildType;
  isSelected: boolean;
}

const NavItem = ({ item, isSelected }: NavItemProps) => {
  const Icon = item.icon && Icons[item.icon as keyof typeof Icons];

  return (
    <Link
      to={item.url || '#'}
      className={`flex items-center px-3 py-2 my-1 rounded-md transition-colors ${
        isSelected 
          ? 'bg-blue-100 text-blue-600' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {Icon && (
        <span className="mr-2">
          <Icon className="h-5 w-5" />
        </span>
      )}
      <span>{item.title}</span>
    </Link>
  );
};

export default NavItem;
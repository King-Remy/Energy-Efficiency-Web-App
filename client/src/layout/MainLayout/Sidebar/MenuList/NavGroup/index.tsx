// src/layouts/MainLayout/Sidebar/MenuList/NavGroup/index.tsx
import { MenuItemType, MenuChildType } from '@/menu-items/types';
import NavItem from '../NavItem';

// ==============================|| SIDEBAR MENU GROUP ||============================== //

interface NavGroupProps {
  item: MenuItemType;
  selectedItem: string | null;
}

const NavGroup = ({ item, selectedItem }: NavGroupProps) => {
  const items = item.children?.map((menu) => {
    return <NavItem key={menu.id} item={menu} isSelected={selectedItem === menu.id} />;
  });

  return (
    <div className="py-2 px-4">
      <div className="text-sm font-medium text-gray-500 mb-2">{item.title}</div>
      {items}
    </div>
  );
};

export default NavGroup;
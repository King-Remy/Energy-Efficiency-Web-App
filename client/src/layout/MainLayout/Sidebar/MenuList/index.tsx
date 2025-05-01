
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import menuItems from '@/menu-items';
import NavGroup from './NavGroup';
import { MenuChildType } from '@/menu-items/types';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const { pathname } = useLocation();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    const findSelectedItem = (items: MenuChildType[]): string | null => {
      for (const item of items) {
        if (item.url === pathname) {
          return item.id;
        }
        if (item.children) {
          const foundInChildren = findSelectedItem(item.children);
          if (foundInChildren) return foundInChildren;
        }
      }
      return null;
    };

    const selected = menuItems.items.reduce<string | null>((acc, item) => {
      if (acc) return acc;
      return item.children ? findSelectedItem(item.children) : null;
    }, null);

    setSelectedItem(selected);
  }, [pathname]);

  const navItems = menuItems.items.map((item) => {
    return <NavGroup key={item.id} item={item} selectedItem={selectedItem} />;
  });

  return <>{navItems}</>;
};

export default MenuList;
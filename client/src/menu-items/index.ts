// src/menu-items/index.ts
import dashboard from './dashboard';
import profile from './profile';

// types
import { MenuItemType } from './types';

const menuItems: { items: MenuItemType[] } = {
  items: [dashboard, profile]
};

export default menuItems;
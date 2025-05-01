
import { MenuItemType } from './types';

const dashboard: MenuItemType = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: 'GridIcon',
      breadcrumbs: false
    }
  ]
};

export default dashboard;
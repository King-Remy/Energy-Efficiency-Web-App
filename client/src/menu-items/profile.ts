
import { MenuItemType } from './types';

const profile: MenuItemType = {
  id: 'profile',
  title: 'User',
  type: 'group',
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/dashboard/profile',
      icon: 'UserIcon',
      breadcrumbs: false
    }
  ]
};

export default profile;
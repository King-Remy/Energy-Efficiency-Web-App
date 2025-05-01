
export type MenuChildType = {
    id: string;
    title: string;
    type: string;
    url?: string;
    icon?: string;
    breadcrumbs?: boolean;
    children?: MenuChildType[];
    external?: boolean;
  };
  
  export type MenuItemType = {
    id: string;
    title: string;
    type: string;
    children?: MenuChildType[];
  };
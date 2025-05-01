import React from 'react';
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
    const routes = useRoutes([AuthenticationRoutes, MainRoutes]);
    return routes;
};

export default Routes;

import React, { Suspense } from 'react';

// project imports
import Loader from './loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component: React.LazyExoticComponent<React.FC>) => (props: any) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
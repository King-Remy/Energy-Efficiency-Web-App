import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState, AppDispatch } from './store';
import { fetchUserProfile } from './store/slices/authSlice';
import AuthLogin from './views/authentication/auth-forms/AuthLogin';
import AuthRegister from './views/authentication/auth-forms/AuthRegister';
import Dashboard from './views/dashboard/page';
import Profile from './views/profile/page';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './routes/ProtectedRoutes';
import './index.css';

const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <Routes>
      <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <AuthLogin />} />
      <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <AuthRegister />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      
      <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
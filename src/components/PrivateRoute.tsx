import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Spinner from './Spinner';

const PrivateRoute: React.FC = () => {
  const authorizationStatus = useSelector(
    (state: RootState) => state.rental.authorizationStatus
  );
  const authChecking = useSelector(
    (state: RootState) => state.rental.authChecking
  );

  if (authChecking) {
    return <Spinner />;
  }

  if (authorizationStatus === 'NO_AUTH') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;

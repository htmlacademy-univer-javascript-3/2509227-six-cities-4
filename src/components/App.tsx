import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from '../store/action';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import OfferPage from './OfferPage';
import FavoritesPage from './FavoritesPage';
import NotFoundPage from './NotFoundPage';
import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import Spinner from './Spinner';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authChecking = useSelector(
    (state: RootState) => state.rental.authChecking
  );

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (authChecking) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

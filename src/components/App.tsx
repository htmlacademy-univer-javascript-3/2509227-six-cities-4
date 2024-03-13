import { FC } from 'react';
import NotFoundPage from './NotFoundPage';
import PrivateRoute from './PrivateRoute';
import HomePage from './HomePage.tsx';
import { IOffer } from '../types.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.tsx';
import OfferPage from './OfferPage.tsx';
import FavoritesPage from './FavoritesPage.tsx';


const App:FC<{offers: IOffer[]}> = ({ offers }) => {
  const isAuthenticated = false;

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage offersCount={offers.length} offers={offers} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="/favorites" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route index element={<FavoritesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

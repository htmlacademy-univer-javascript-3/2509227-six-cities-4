import React from 'react';
import HomePage from './HomePage.tsx';

const App = ({ offers }) => {
  return <HomePage offersCount={offers.length} offers={offers} />;
};

export default App;

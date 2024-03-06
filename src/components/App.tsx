import { FC } from 'react';
import HomePage from './HomePage.tsx';
import { IOffer } from '../types.ts';


const App:FC<{offers: IOffer[]}> = ({ offers }) => {
  return <HomePage offersCount={offers.length} offers={offers} />;
};

export default App;

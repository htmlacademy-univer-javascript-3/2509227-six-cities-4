import React from 'react';
import { IOffer } from '../types';
import OfferCard from './OfferCard';

interface NearbyOffersListProps {
  offers: IOffer[];
}

const NearbyOffersList: React.FC<NearbyOffersListProps> = ({ offers }) => {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
};

export default NearbyOffersList;

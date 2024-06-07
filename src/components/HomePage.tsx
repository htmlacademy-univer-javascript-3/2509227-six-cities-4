import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchOffers, fetchFavorites } from '../store/action';
import CitiesList from '../components/CitiesList';
import OfferCard from '../components/OfferCard';
import MapComponent from '../components/MapComponent';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import SortOptions from '../components/SortOptions';
import Header from './Header';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const city = useSelector((state: RootState) => state.rental.city);
  const offers = useSelector((state: RootState) => state.rental.offers);
  const sortType = useSelector((state: RootState) => state.rental.sortType);
  const loading = useSelector((state: RootState) => state.rental.loading);
  const error = useSelector((state: RootState) => state.rental.error);
  const cityCoords: [number, number] = useSelector(() => {
    const selectedCity = offers.find((offer) => offer.city.name === city)?.city
      .location;
    return selectedCity
      ? [selectedCity.latitude, selectedCity.longitude]
      : [52.38333, 4.9];
  });

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const cityOffers = offers.filter((offer) => offer.city.name === city);

  const sortedOffers = [...cityOffers].sort((a, b) => {
    switch (sortType) {
      case 'Price: low to high':
        return a.price - b.price;
      case 'Price: high to low':
        return b.price - a.price;
      case 'Top rated first':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {sortedOffers.length} places to stay in {city}
              </b>
              <SortOptions />
              <div className="cities__places-list places__list tabs__content">
                {sortedOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            </section>
            <div className="cities__right-section">
              <MapComponent offers={sortedOffers} cityCoords={cityCoords} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

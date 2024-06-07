import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchOffer,
  fetchNearbyOffers,
  fetchComments,
  postComment,
  toggleFavorite,
  fetchFavorites,
} from '../store/action';
import { RootState, AppDispatch } from '../store';
import ReviewsList from '../components/ReviewsList';
import MapComponent from '../components/MapComponent';
import NearbyOffersList from '../components/NearbyOffersList';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import Header from './Header';
import { IFullOffer } from '../types';

const OfferPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentOffer = useSelector(
    (state: RootState) => state.rental.currentOffer as IFullOffer | null
  );
  const comments = useSelector((state: RootState) => state.rental.comments);
  const loading = useSelector((state: RootState) => state.rental.loading);
  const error = useSelector((state: RootState) => state.rental.error);
  const nearbyOffers = useSelector(
    (state: RootState) => state.rental.nearbyOffers
  );
  const authorizationStatus = useSelector(
    (state: RootState) => state.rental.authorizationStatus
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchComments(id));
      dispatch(fetchFavorites());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      navigate('/404');
    }
  }, [error, navigate]);

  if (loading || !currentOffer) {
    return <Spinner />;
  }

  if (!currentOffer) {
    return <ErrorMessage message="Offer not found" />;
  }

  const handleCommentSubmit = (comment: string, rating: number) => {
    if (id) {
      dispatch(postComment({ offerId: id, comment, rating }));
    }
  };

  const handleFavoriteToggle = () => {
    if (authorizationStatus !== 'AUTH') {
      navigate('/login');
      return;
    }
    if (id) {
      const status = currentOffer.isFavorite ? 0 : 1;
      dispatch(toggleFavorite({ offerId: id, status }));
    }
  };

  const reviews = Array.isArray(comments) ? comments : [];
  const nearbyOffersToShow = nearbyOffers.slice(0, 3);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((image, index) => (
                <div className="offer__image-wrapper" key={index}>
                  <img
                    className="offer__image"
                    src={image}
                    alt={`Photo studio ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${
                    currentOffer.isFavorite
                      ? 'offer__bookmark-button--active'
                      : ''
                  }`}
                  type="button"
                  onClick={handleFavoriteToggle}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use href="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${currentOffer.rating * 20}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good, index) => (
                    <li className="offer__inside-item" key={index}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>
              <ReviewsList
                reviews={reviews}
                onCommentSubmit={handleCommentSubmit}
                authorizationStatus={authorizationStatus}
              />
            </div>
          </div>
          <MapComponent
            offers={nearbyOffersToShow.concat(currentOffer)}
            cityCoords={[
              currentOffer.city.location.latitude,
              currentOffer.city.location.longitude,
            ]}
          />
        </section>
        <div className="container">
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <NearbyOffersList offers={nearbyOffersToShow} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;

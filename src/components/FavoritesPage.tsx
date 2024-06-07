import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, toggleFavorite } from '../store/action';
import { RootState, AppDispatch } from '../store';
import FavoritesEmptyPage from './FavoritesEmptyPage';
import Header from './Header';

const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.rental.favorites);
  const authorizationStatus = useSelector(
    (state: RootState) => state.rental.authorizationStatus
  );

  useEffect(() => {
    if (authorizationStatus === 'AUTH') {
      dispatch(fetchFavorites());
    }
  }, [dispatch, authorizationStatus]);

  if (favorites.length === 0) {
    return <FavoritesEmptyPage />;
  }

  const handleFavoriteToggle = (favoriteId: string, isFavorite: boolean) => {
    const status = isFavorite ? 0 : 1;
    dispatch(toggleFavorite({ offerId: favoriteId, status }));
  };

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favorites.map((favorite) => (
                <li className="favorites__locations-items" key={favorite.id}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{favorite.city.name}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <article className="favorites__card place-card">
                      {favorite.isPremium && (
                        <div className="place-card__mark">
                          <span>Premium</span>
                        </div>
                      )}
                      <div className="favorites__image-wrapper place-card__image-wrapper">
                        <a href="#">
                          <img
                            className="place-card__image"
                            src={favorite.previewImage}
                            width="150"
                            height="110"
                            alt="Place image"
                          />
                        </a>
                      </div>
                      <div className="favorites__card-info place-card__info">
                        <div className="place-card__price-wrapper">
                          <div className="place-card__price">
                            <b className="place-card__price-value">
                              &euro;{favorite.price}
                            </b>
                            <span className="place-card__price-text">
                              &#47;&nbsp;night
                            </span>
                          </div>
                          <button
                            className={`place-card__bookmark-button button ${
                              favorite.isFavorite
                                ? 'place-card__bookmark-button--active'
                                : ''
                            }`}
                            type="button"
                            onClick={() =>
                              handleFavoriteToggle(
                                favorite.id,
                                favorite.isFavorite
                              )}
                          >
                            <svg
                              className="place-card__bookmark-icon"
                              width="18"
                              height="19"
                            >
                              <use href="#icon-bookmark"></use>
                            </svg>
                            <span className="visually-hidden">
                              {favorite.isFavorite
                                ? 'In bookmarks'
                                : 'To bookmarks'}
                            </span>
                          </button>
                        </div>
                        <div className="place-card__rating rating">
                          <div className="place-card__stars rating__stars">
                            <span
                              style={{ width: `${favorite.rating * 20}%` }}
                            />
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <h2 className="place-card__name">
                          <a href="#">{favorite.title}</a>
                        </h2>
                        <p className="place-card__type">{favorite.type}</p>
                      </div>
                    </article>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
};

export default FavoritesPage;

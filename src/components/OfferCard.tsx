import { FC } from 'react';
import { IOffer } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { highlightOffer } from '../store/action';
import { toggleFavorite } from '../store/action';
import { AppDispatch, RootState } from '../store';

const OfferCard: FC<{ offer: IOffer }> = ({ offer }) => {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector((state: RootState) => state.rental.authorizationStatus);
  const navigate = useNavigate();


  const handleFavoriteToggle = () => {
    if (authorizationStatus !== 'AUTH') {
      navigate('/login');
      return;
    }
    const status = offer.isFavorite ? 0 : 1;
    dispatch(toggleFavorite({ offerId: offer.id, status }));
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => dispatch(highlightOffer(Number(offer.id)))}
      onMouseLeave={() => dispatch(highlightOffer(null))}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              offer.isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button"
            onClick={handleFavoriteToggle}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

export default OfferCard;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { postComment } from '../store/action';
import { useParams } from 'react-router-dom';

const CommentForm:React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const authorizationStatus = useSelector((state: RootState) => state.rental.authorizationStatus);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authorizationStatus === 'AUTH' && id) {
      dispatch(postComment({ offerId: id, comment, rating }));
      setComment('');
      setRating(0);
    }
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              id={`${star}-stars`}
              type="radio"
              name="rating"
              value={star}
              checked={rating === star}
              onChange={() => setRating(star)}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width="37" height="33">
                <use href="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={comment.length < 50 || rating === 0}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CommentForm;

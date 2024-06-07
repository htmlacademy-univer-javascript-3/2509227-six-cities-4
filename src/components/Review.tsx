import React from 'react';
import { IComment } from '../types';

interface ReviewProps {
  review: IComment;
}

const Review: React.FC<ReviewProps> = React.memo(({ review }) => {
  const displayDate = new Date(review.date).toLocaleDateString('ru-RU', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt={`Avatar of ${review.user.name}`}
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
        {review.user.isPro && <span className="reviews__user-status">Pro</span>}
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${review.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {displayDate}
        </time>
      </div>
    </li>
  );
});

export default Review;

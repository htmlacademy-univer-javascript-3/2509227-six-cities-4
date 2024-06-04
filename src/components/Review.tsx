import React from 'react';

interface ReviewProps {
  review: {
    id: number;
    author: string;
    avatar: string;
    rating: number;
    text: string;
    date: string;
    displayDate: string;
  };
}

const Review: React.FC<ReviewProps> = ({ review }) => {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.avatar}
            width="54"
            height="54"
            alt={`Avatar of ${review.author}`}
          />
        </div>
        <span className="reviews__user-name">{review.author}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${review.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.text}</p>
        <time className="reviews__time" dateTime={review.date}>
          {review.displayDate}
        </time>
      </div>
    </li>
  );
};

export default Review;

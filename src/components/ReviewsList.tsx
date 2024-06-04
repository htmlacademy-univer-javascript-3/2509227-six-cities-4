import React from 'react';
import Review from './Review';
import CommentForm from './CommentForm';

interface ReviewsProps {
  reviews: Array<{
    id: number;
    author: string;
    avatar: string;
    rating: number;
    text: string;
    date: string;
    displayDate: string;
  }>;
}

const ReviewsList: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
      <CommentForm />
    </section>
  );
};

export default ReviewsList;

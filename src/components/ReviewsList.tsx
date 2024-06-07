import React from 'react';
import Review from './Review';
import CommentForm from './CommentForm';
import { IComment } from '../types';

interface ReviewsListProps {
  reviews: IComment[];
  onCommentSubmit: (comment: string, rating: number) => void;
  authorizationStatus: string;
}

const ReviewsList: React.FC<ReviewsListProps> = React.memo(
  ({ reviews, authorizationStatus }) => {
    const sortedReviews = [...reviews].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const recentReviews = sortedReviews.slice(0, 3);

    return (
      <section className="offer__reviews reviews">
        <h2 className="reviews__title">
          Reviews &middot;{' '}
          <span className="reviews__amount">{reviews.length}</span>
        </h2>
        <ul className="reviews__list">
          {recentReviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </ul>
        {authorizationStatus === 'AUTH' && <CommentForm />}
      </section>
    );
  }
);

ReviewsList.displayName = 'ReviewsList';

export default ReviewsList;

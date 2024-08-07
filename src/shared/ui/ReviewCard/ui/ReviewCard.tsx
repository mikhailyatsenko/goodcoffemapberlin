import BeanIcon from 'shared/ui/RatingWidget/ui/BeanIcon';
import defaultUserAvatar from '../../../assets/user-default-icon.svg';
import cls from './ReviewCard.module.scss';

interface ReviewCardProps {
  id: string;
  userAvatar?: string;
  userName: string;
  reviewText: string;
  rating?: number;
  isOwnReview?: boolean;
  handleDeleteReview: (id: string) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  id,
  userAvatar,
  userName,
  reviewText,
  rating,
  isOwnReview,
  handleDeleteReview,
}) => {
  return (
    <div className={cls.reviewCard}>
      <div className={cls.userInfo}>
        <img src={userAvatar ?? defaultUserAvatar} alt={userName} className={cls.avatar} referrerPolicy="no-referrer" />
        <span className={cls.userName}>{userName}</span>
        {rating && (
          <div className={cls.userRate}>
            <BeanIcon filled />
            <div className={cls.userRateNumber}>{rating}</div>
          </div>
        )}
      </div>

      <p className={cls.reviewText}>{!reviewText && rating ? `Rated: ${rating}` : reviewText}</p>

      {isOwnReview && (
        <button
          onClick={() => {
            handleDeleteReview(id);
          }}
          className={cls.deleteButton}
        >
          Delete
        </button>
      )}
    </div>
  );
};

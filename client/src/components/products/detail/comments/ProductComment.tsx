import { FC } from 'react';
import StarRating from '../../../shared/StarRating';
import styles from './ProductComment.module.css';

const ProductComment: FC<{
  userImage: string;
  username: string;
  date: string;
  comment: string;
  rating: number;
}> = ({ userImage, username, date, comment, rating }) => {
  return (
    <li className={styles.comment}>
      <div className={styles['user-info']}>
        <img src={userImage} alt={`${username}'s profile`} />
        <span>{username}</span>
        <span>{date}</span>
      </div>
      <div className={styles['user-comment']}>
        <p>Status</p>
        <StarRating width={rating} />
        <p>{comment}</p>
      </div>
    </li>
  );
};

export default ProductComment;

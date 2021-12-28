import { FC } from 'react';

import StarRating from '../../../shared/StarRating';

import styles from './ProductComment.module.css';

const ProductComment: FC<{
  userImage: string;
  email: string;
  status: string;
  date: string;
  comment: string;
  rating: number;
}> = ({ userImage, email, status, date, comment, rating }) => {
  return (
    <li className={styles.comment}>
      <div className={styles['user-info']}>
        <img src={userImage} alt={`${email}'s profile`} />
        <span>{email}</span>
        <span>{date ? new Date(date).toLocaleString() : 'unknown'}</span>
        <p className={styles['comment-status']}>Rating: {status}</p>
      </div>
      <div className={styles['user-comment']}>
        <StarRating width={rating * 20} show />
        <p>{comment}</p>
      </div>
    </li>
  );
};

export default ProductComment;

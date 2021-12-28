import { FC } from 'react';

import { IComment } from '../../../../interfaces/category-product';
import ProductComment from './ProductComment';

import noAvatarImage from '../../../../assets/no-avatar.png';
import styles from './ProductCommentList.module.css';

const ProductCommentList: FC<{comments:IComment[]}> = ({comments}) => {
  return (
    <ul className={styles.comments}>
      {comments.map((c) => (
        <ProductComment
          key={c._id}
          userImage={c?.user?.image?.url || noAvatarImage}
          email={c?.user.email}
          date={c.createdAt}
          rating={c.rating}
          status={c.status}
          comment={c.comment}
        />
      ))}
    </ul>
  );
};

export default ProductCommentList;

import { FC } from 'react';
import StarRating from '../../../shared/StarRating';
import ProductComment from './ProductComment';
import styles from './ProductCommentList.module.css';

const comments_dummy = [
  {
    _id: 'comment_11',
    userImage:
      'https://res.cloudinary.com/dofijitd8/image/upload/v1628952324/shared-trips/images/s4iu2zctmmxmek3yi34r.jpg',
    username: 'Mihail Valkov',
    date: '18.02.2021',
    comment: `Aparelho super leve, carrega rápido, fácil de usar, recebi antes do prazo, super
    completo: além do carregador e adaptador para o fone, veio com película e capa. Estou
    super feliz e satisfeita, o aparelho é lindo !!!`,
    rating: 88,
  },
  {
    _id: 'comment_13',
    userImage:
      'https://res.cloudinary.com/dofijitd8/image/upload/v1628952324/shared-trips/images/s4iu2zctmmxmek3yi34r.jpg',
    username: 'Ivan',
    date: '05.07.2021',
    comment: `Super além do carregador e adaptador para o fone, veio com película e capa. Estou
    super feliz e satisfeita, o aparelho é lindo !!!`,
    rating: 88,
  },
];

const ProductCommentList: FC<{}> = (props) => {
  return (
    <ul className={styles.comments}>
      {comments_dummy.map((c) => (
        <ProductComment
          key={c._id}
          userImage={c.userImage}
          username={c.username}
          date={c.date}
          rating={c.rating}
          comment={c.comment}
        />
      ))}
    </ul>
  );
};

export default ProductCommentList;

import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addProductToCart } from '../../../+store/cart/cart-slice';
import {
  addProductToFavorites,
  deleteProductFromFavorites,
} from '../../../+store/favorites/favorites-slice';
import { ICategoryProduct } from '../../../interfaces/category-product';
import { AppRootState } from '../../../+store/store';

import { faHeart, faCartArrowDown, faStar } from '@fortawesome/free-solid-svg-icons';

import Modal from '../../shared/Modal';
import PreviewImages from '../../shared/PreviewImages';
import Colors from '../../shared/Colors';
import StarRating from '../../shared/StarRating';
import RateProduct from './rate-product/RateProduct';
import MoreInfo from './MoreInfo';
import Button from '../../shared/Button';
import ProductCommentList from './comments/ProductCommentList';
import SimilarProductsList from './SimilarProductsList';

import styles from './Detail.module.css';

const Detail: FC<{ product: ICategoryProduct; products: ICategoryProduct[] }> = ({
  product,
  products,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: AppRootState) => state.favorites.products).find(
    (p) => p._id === product._id
  );
  const user = useSelector((state: AppRootState) => state.auth.user);
  const moreInformation = {
    category: product.category,
    brand: product.brand,
    model: product.model,
    year: product.year,
  };
  const { rating, ...others } = product;
  const productRating = (rating?.totalRating / product?.rating?.comments?.length) * 20 || 0;
  const rate = Object.entries(rating?.rate).map(([k, v]) => {
    return { [k]: (v / rating?.comments?.length) * 100 || 0 };
  });

  const isAlreadyRated = user?.comments.find((c) => c.productId === product._id);

  const changeImageHandler = (src: string) => {
    setCurrentImage(src);
  };

  const onShowModal = () => setShowModal((prev) => !prev);

  const selectColorHandler = (obj: { [prop: string]: string }) => {
    setSelectedColor(obj.color);
  };

  const onAddProductToCart = () => {
    dispatch(addProductToCart({ product: { ...others, rating: productRating }, selectedColor }));
  };

  const onAddProductToFavorites = () => {
    dispatch(
      addProductToFavorites({ product: { ...others, rating: productRating }, selectedColor })
    );
  };
  const onDeleteProductFromFavorites = () => {
    dispatch(deleteProductFromFavorites({ id: product._id }));
  };

  return (
    <section>
      <h2>{product.name}</h2>
      <div className={styles.container}>
        <div className={styles.left}>
          <PreviewImages
            images={product.images}
            currentImage={currentImage}
            onChangeImage={changeImageHandler}
          />
        </div>
        <div className={styles.center}>
          <h2>{product.name}</h2>
          <h3>Rating</h3>
          <StarRating width={productRating} show />
          <h3>Color</h3>
          <Colors
            colors={product.colors}
            inputType='radio'
            onSelectColor={selectColorHandler}
            selectedColor={selectedColor}
          />
          <h3>Price</h3>
          <h3 className={styles.price}>{product.price} BGN</h3>
          <div className={styles['more-info']}>
            <h3>More Information</h3>
            <MoreInfo information={moreInformation} />
          </div>
          <div className={styles.description}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
        <div className={styles.right}>
          <p className={`${styles['total-price']}`}> {product.price} BGN </p>
          {product.availablePieces > 0 ? (
            <p className={`${styles['available']}`}> Available </p>
          ) : (
            <p className={`${styles['available']} ${styles['unavailable']}`}> Not Available </p>
          )}

          <div className={`${styles.actions}`}>
            <Button
              icon={faCartArrowDown}
              classes={`${styles.btn} ${styles['cart']}`}
              onClick={onAddProductToCart}
            >
              Add to cart
            </Button>

            <Button
              icon={faHeart}
              classes={`${styles.btn} ${styles['favorite']} ${isFavorite && styles['highlighted']}`}
              onClick={isFavorite ? onDeleteProductFromFavorites : onAddProductToFavorites}
            >
              Add to favorites
            </Button>

            {!isAlreadyRated && user && (
              <Button icon={faStar} onClick={onShowModal} classes={`${styles.btn} ${styles.rate}`}>
                Rate this product
              </Button>
            )}
          </div>
        </div>
      </div>
      {products.length === 0 ? null : (
        <SimilarProductsList products={products} category={product.category} />
      )}
      {showModal && (
        <Modal onClose={onShowModal} classes={styles['rate-modal']}>
          {
            <RateProduct
              onClose={onShowModal}
              name={product.description}
              price={product.price}
              imageUrl={product.images[0]}
              userId={user ? user._id : null}
              productId={product._id}
              rate={rate}
            />
          }
        </Modal>
      )}
      <ProductCommentList comments={product?.rating?.comments || []} />
    </section>
  );
};

export default Detail;

import { FC, forwardRef, Ref } from 'react';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../../+store/cart/cart-slice';
import {
  addProductToFavorites,
  deleteProductFromFavorites,
} from '../../../+store/favorites/favorites-slice';
import { ICategoryProduct } from '../../../interfaces/category-product';
import { IBaseProduct } from '../../../interfaces/cart-product';
import Product from './Product';

import noProductsImg from '../../../assets/no-products.png';
import styles from './ProductList.module.css';

const ProductList: FC<{
  products: ICategoryProduct[];
  width?: number;
  mRef?: Ref<HTMLUListElement> | null;
}> = forwardRef(({ products, width, mRef }) => {
  const dispatch = useDispatch();
  const style = { transform: `translate3d(${width}px, 0px, 0px)` };

  const onAddProductToCartHandler = (product: IBaseProduct) => {
    dispatch(addProductToCart({ product, selectedColor: product.colors[0] }));
  };

  const onAddProductToFavoritesHandler = (product: IBaseProduct) => {
    dispatch(addProductToFavorites({ product, selectedColor: product.colors[0] }));
  };
  const onDeleteProductFromFavoritesHandler = (id: string) => {
    dispatch(deleteProductFromFavorites({ id }));
  };

  if (products.length === 0) {
    return (
      <div className={styles['no-products']}>
        <img src={noProductsImg} alt='product' />
      </div>
    );
  }

  return (
    <ul className={styles.container} style={style} ref={mRef}>
      {products.map((p) => (
        <Product
          key={p._id}
          product={p}
          onAddProductToCart={onAddProductToCartHandler}
          onAddProductToFavorites={onAddProductToFavoritesHandler}
          onDeleteProductFromFavorites={onDeleteProductFromFavoritesHandler.bind(null, p._id)}
        />
      ))}
    </ul>
  );
});

export default ProductList;

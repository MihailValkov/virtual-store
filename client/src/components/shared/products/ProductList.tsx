import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../../+store/cart/cart-slice';
import {
  addProductToFavorites,
  deleteProductFromFavorites,
} from '../../../+store/favorites/favorites-slice';
import { ICategoryProduct } from '../../../interfaces/category-product';
import Product from './Product';

import noProductsImg from '../../../assets/no-products.png';
import styles from './ProductList.module.css';

const ProductList: FC<{ products: ICategoryProduct[]; width?: number }> = ({ products, width }) => {
  const dispatch = useDispatch();
  const style = { transform: `translate3d(${width}px, 0px, 0px)` };

  const onAddProductToCartHandler = (product: ICategoryProduct) => {
    dispatch(addProductToCart({ product }));
  };

  const onAddProductToFavoritesHandler = (product: ICategoryProduct) => {
    dispatch(addProductToFavorites({ product }));
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
    <ul className={styles.container} style={style}>
      {products.map((p) => (
        <Product
          key={p._id}
          product={p}
          onAddProductToCart={onAddProductToCartHandler.bind(null, p)}
          onAddProductToFavorites={onAddProductToFavoritesHandler.bind(null, p)}
          onDeleteProductFromFavorites={onDeleteProductFromFavoritesHandler.bind(null, p._id)}
        />
      ))}
    </ul>
  );
};

export default ProductList;

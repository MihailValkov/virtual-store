import { FC } from 'react';
import { ICategoryProduct } from '../../../interfaces/category-product';
import Product from './Product';
import styles from './ProductList.module.css';

const ProductList: FC<{ products: ICategoryProduct[]; width?: number }> = ({ products, width }) => {
  const style = { transform: `translate3d(${width}px, 0px, 0px)` };

  return (
    <ul className={styles.container} style={style}>
      {products.map((p) => (
        <Product key={p._id} product={p} />
      ))}
    </ul>
  );
};

export default ProductList;

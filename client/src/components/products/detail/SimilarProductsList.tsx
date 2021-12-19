import { FC, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SimilarProductsList.module.css';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ProductList from '../../shared/products/ProductList';
import { useSelector } from 'react-redux';
import { AppRootState } from '../../../+store/store';
import Button from '../../shared/Button';
import { ICategoryProduct } from '../../../interfaces/category-product';

const SimilarProductsList: FC<{ products: ICategoryProduct[] }> = ({ products }) => {
  const productsContainer = useRef<HTMLDivElement>(null);
  const [currentWidth, setCurrentWidth] = useState(0);
  const showNextProduct = (direction: string) => {
    const width = 281;
    const productsLength = products.length;
    const maxItems = 5;
    if (direction === 'right') {
      Math.abs(currentWidth - width) + maxItems * width <= productsLength * width &&
        setCurrentWidth(currentWidth - width);
    } else if (direction === 'left') {
      currentWidth + width <= 0 && setCurrentWidth(currentWidth + width);
    }
  };

  return (
    <div className={styles.products}>
      <h2>Customers also viewed these products</h2>
      <div className={styles['products-inner']} ref={productsContainer}>
        <Button
          icon={faArrowLeft}
          classes={`${styles.arrow} ${styles['arrow-left']}`}
          onClick={showNextProduct.bind(null, 'left')}
        />
        <ProductList width={currentWidth} products={products} />
        <Button
          icon={faArrowRight}
          classes={`${styles.arrow} ${styles['arrow-right']}`}
          onClick={showNextProduct.bind(null, 'right')}
        />
      </div>
    </div>
  );
};

export default SimilarProductsList;

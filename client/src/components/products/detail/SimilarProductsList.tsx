import { FC, useRef, useState } from 'react';

import { ICategoryProduct } from '../../../interfaces/category-product';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import ProductList from '../../shared/products/ProductList';
import Button from '../../shared/Button';

import styles from './SimilarProductsList.module.css';

const SimilarProductsList: FC<{ products: ICategoryProduct[]; category: string }> = ({
  products,
  category,
}) => {
  const productsContainer = useRef<HTMLDivElement>(null);
  const [currentWidth, setCurrentWidth] = useState(0);
  const showNextProduct = (direction: string) => {
    const width = 281;
    const productsLength = products.length;
    const maxItems = products.length < 5 ? 1 : 5;
    if (direction === 'right') {
      Math.abs(currentWidth - width) + maxItems * width <= productsLength * width &&
        setCurrentWidth(currentWidth - width);
    } else if (direction === 'left') {
      currentWidth + width <= 0 && setCurrentWidth(currentWidth + width);
    }
  };

  return (
    <div className={styles.products}>
      <h2>Similar products of category {category}</h2>
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

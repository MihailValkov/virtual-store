import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';

import { ICategoryProduct } from '../../../interfaces/category-product';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import ProductList from '../../shared/products/ProductList';
import Button from '../../shared/Button';

import styles from './SimilarProductsList.module.css';

const initialState = {
  currentPage: 1,
  pages: 1,
  containerWidth: 0,
  currentWidth: 0,
};

const SimilarProductsList: FC<{
  products: ICategoryProduct[];
  category: string;
  itemMaxWidth: number;
}> = memo(({ products, category, itemMaxWidth }) => {
  const productsContainer = useRef<HTMLUListElement>(null);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState((state) => ({
      ...state,
      containerWidth: Number(productsContainer.current!.offsetWidth),
      pages: Math.ceil(
        (products.length * itemMaxWidth) / Number(productsContainer.current!.offsetWidth)
      ),
    }));
  }, [productsContainer.current?.offsetWidth, products.length, itemMaxWidth]);

  const onButtonHandler = useCallback(
    (direction: string) => {
      if (direction === 'right') {
        if (state.currentPage + 1 < state.pages) {
          setState((state) => ({
            ...state,
            currentWidth: state.currentWidth - state.containerWidth,
            currentPage: state.currentPage + 1,
          }));
        } else {
          setState((state) => ({
            ...state,
            currentWidth: -(products.length * itemMaxWidth - state.containerWidth),
            currentPage: state.pages,
          }));
        }
      } else if (direction === 'left') {
        if (state.currentPage - 1 > 1) {
          setState((state) => ({
            ...state,
            currentWidth: state.currentWidth + state.containerWidth,
            currentPage: state.currentPage - 1,
          }));
        } else {
          setState((state) => ({ ...state, currentWidth: 0, currentPage: 1 }));
        }
      }
    },
    [state, products.length, itemMaxWidth]
  );

  return (
    <div className={styles.products}>
      <h2>Similar products of category {category}</h2>
      <div className={styles['products-inner']}>
        <Button
          icon={faArrowLeft}
          classes={`${styles.arrow} ${styles['arrow-left']}`}
          onClick={onButtonHandler.bind(null, 'left')}
          disabled={state.currentPage === 1}
        />
        <div className={styles['product-container']}>
          <ProductList products={products} width={state.currentWidth} ref={productsContainer} />
        </div>
        <Button
          icon={faArrowRight}
          classes={`${styles.arrow} ${styles['arrow-right']}`}
          onClick={onButtonHandler.bind(null, 'right')}
          disabled={state.currentPage === state.pages}
        />
      </div>
    </div>
  );
});

export default SimilarProductsList;

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { loadProductAction, loadProductsAction } from '../../+store/products/products-actions';
import { AppRootState } from '../../+store/store';

import Detail from '../../components/products/detail/Detail';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const CategoryDetailPage: FC<{}> = () => {
  const { productId, category } = useParams<{ productId: string; category: string }>();
  const products = useSelector((state: AppRootState) => state.products.productsList);
  const product = useSelector((state: AppRootState) => state.products.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsAction(category));
    dispatch(loadProductAction(category, productId));
  }, [category, dispatch, productId]);

  if (!products || !product) {
    return <LoadingSpinner />;
  }

  return <Detail products={products} product={product} />;
};

export default CategoryDetailPage;

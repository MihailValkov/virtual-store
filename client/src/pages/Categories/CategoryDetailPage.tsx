import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { loadProductsAction } from '../../+store/products/products-actions';
import { AppRootState } from '../../+store/store';

import Detail from '../../components/products/detail/Detail';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const CategoryDetailPage: FC<{}> = () => {
  const { productId, category } = useParams<{ productId: string; category: string }>();
  const products = useSelector((state: AppRootState) => state.products.productsList);
  const product = products.find((p) => p._id === productId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsAction(category));
  }, [category, dispatch]);

  if (!product || !products) {
    return <LoadingSpinner />;
  }

  return <Detail product={product} products={products} />;
};

export default CategoryDetailPage;

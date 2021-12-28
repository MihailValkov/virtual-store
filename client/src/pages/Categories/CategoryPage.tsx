import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { loadProductsAction } from '../../+store/products/products-actions';
import { AppRootState } from '../../+store/store';

import ProductList from '../../components/shared/products/ProductList';

const CategoryPage: FC<{}> = () => {
  const { category } = useParams<{ category: string }>();
  const dispatch = useDispatch();
  const products = useSelector((state: AppRootState) => state.products.productsList);

  useEffect(() => {
    dispatch(loadProductsAction(category));
  }, [category, dispatch]);

  return <ProductList products={products} />;
};

export default CategoryPage;

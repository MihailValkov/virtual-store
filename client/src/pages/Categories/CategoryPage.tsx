import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import ProductList from '../../components/shared/products/ProductList';

const CategoryPage: FC<{}> = () => {
  const { category } = useParams<{ category: string }>();
  const products = [
    {
      _id: 'p1123',
      images: [
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_a0ae106d44c5ef737055bf8ea9146941.jpg',
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_624f129e976b8be5b997ec63be975bbc.jpg',
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_c4117c439b862b7517cc87d2c57ac78c.jpg',
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_da22c15b78ab4b9743a085ccc9dfd577.jpg',
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_110fe86401f58b10a8a223b14f017a8a.jpg',
      ],
      category: 'phone',
      colors: ['red', 'blue', 'green', 'black', 'purple', 'yellow'],
      name: 'Huawei Nova 9',
      price: 659.85,
      year: 2019,
      availablePieces: 51,
      brand: 'Huawei',
      model: 'Nova 9',
      description: 'Huawei Nova 9, Dual SIM, 128GB, 8GB RAM, 4G, Black',
      rating: 85,
    },
    {
      _id: 'p1223',
      images: [
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_a0ae106d44c5ef737055bf8ea9146941.jpg',
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_624f129e976b8be5b997ec63be975bbc.jpg',
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_c4117c439b862b7517cc87d2c57ac78c.jpg',
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_da22c15b78ab4b9743a085ccc9dfd577.jpg',
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_110fe86401f58b10a8a223b14f017a8a.jpg',
      ],
      category: 'phone',
      colors: ['red', 'blue', 'green', 'black', 'purple', 'yellow'],
      name: 'Huawei Nova 9',
      price: 659.85,
      year: 2019,
      availablePieces: 51,
      brand: 'Huawei',
      model: 'Nova 9',
      description: 'Huawei Nova 9, Dual SIM, 128GB, 8GB RAM, 4G, Black',
      rating: 85,
    },
    {
      _id: 'p1323',
      images: [
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_a0ae106d44c5ef737055bf8ea9146941.jpg',
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_624f129e976b8be5b997ec63be975bbc.jpg',
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_c4117c439b862b7517cc87d2c57ac78c.jpg',
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_da22c15b78ab4b9743a085ccc9dfd577.jpg',
        'https://s13emagst.akamaized.net/products/32170/32169398/images/res_110fe86401f58b10a8a223b14f017a8a.jpg',
      ],
      category: 'phone',
      colors: ['red', 'blue', 'green', 'black', 'purple', 'yellow'],
      name: 'Huawei Nova 9',
      price: 659.85,
      year: 2019,
      availablePieces: 51,
      brand: 'Huawei',
      model: 'Nova 9',
      description: 'Huawei Nova 9, Dual SIM, 128GB, 8GB RAM, 4G, Black',
      rating: 85,
    },
  ];

  useEffect(() => {}, [category]);

  return <ProductList products={products}/>;
};

export default CategoryPage;

import { FC } from 'react';

import computerImg from '../assets/categories/computer.png';
import laptopImg from '../assets/categories/laptop.png';
import tabletImg from '../assets/categories/tablet.png';
import phoneImg from '../assets/categories/phone.png';
import tvImg from '../assets/categories/tv.png';
import monitorImg from '../assets/categories/monitor.png';
import cameraImg from '../assets/categories/camera.png';
import accessoriesImg from '../assets/categories/accessories.png';

import CategoryList from '../components/categories/CategoryList';

const categories = [
  {
    category: 'Laptop',
    imageUrl: laptopImg,
  },
  {
    category: 'Computer',
    imageUrl: computerImg,
  },
  {
    category: 'Computer Accessories',
    imageUrl: accessoriesImg,
  },
  {
    category: 'Monitor',
    imageUrl: monitorImg,
  },
  {
    category: 'Tablet',
    imageUrl: tabletImg,
  },
  {
    category: 'Phone',
    imageUrl: phoneImg,
  },
  {
    category: 'Tv',
    imageUrl: tvImg,
  },
  {
    category: 'Camera',
    imageUrl: cameraImg,
  },
];

const Categories: FC<{}> = () => {
  return <CategoryList categories={categories} />;
};

export default Categories;

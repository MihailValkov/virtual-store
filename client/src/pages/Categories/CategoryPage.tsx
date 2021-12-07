import { FC, useEffect } from 'react';
import { useParams } from 'react-router';

const CategoryPage: FC<{}> = () => {
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    
  },[category]);

  return <h1> test</h1>;
};

export default CategoryPage;

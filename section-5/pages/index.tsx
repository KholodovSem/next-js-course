import fs from 'fs/promises';
import path from 'path';
import { GetStaticProps } from 'next';

export interface Product {
  id: string;
  title: string;
  description: string;
}

interface HomePageProps {
  products: Product[];
}

const HomePage = ({ products }: HomePageProps) => {
  const content = products.map(product => (
    <li key={product.id}>{product.title}</li>
  ));

  return <ul>{content}</ul>;
};

export const getStaticProps: GetStaticProps<HomePageProps> = async context => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath, {
    encoding: 'utf-8',
  });
  const { products } = JSON.parse(jsonData);

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};

export default HomePage;

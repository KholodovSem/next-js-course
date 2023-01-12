import fs from 'fs/promises';
import path from 'path';
import { Fragment } from 'react';
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { Product } from '.';

interface ProductDetailPageProps {
  product: Product;
}

const ProductDetailPage = ({ product }: ProductDetailPageProps) => {
  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
};

interface DynamicPath {
  id: string;
  [index: string]: string;
}

export const getStaticPaths: GetStaticPaths<DynamicPath> = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const data = await fs.readFile(filePath, { encoding: 'utf-8' });
  const products: Product[] = JSON.parse(data).products;
  const paths = products.map(product => {
    return {
      params: { id: product.id },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{ product: Product }> = async (
  context: GetStaticPropsContext<DynamicPath>
) => {
  const { params } = context;
  const id = params?.id;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const data = await fs.readFile(filePath, { encoding: 'utf-8' });
  const products: Product[] = JSON.parse(data).products;
  const product = products.find(product => product.id === id);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductDetailPage;

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/');
    }, 10000);
  });

  return (
    <div>
      <h1>We don't found page by this path</h1>
    </div>
  );
};

export default NotFoundPage;

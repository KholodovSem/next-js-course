import { useRouter } from 'next/router';

const PortfolioProjectPage = () => {
  const router = useRouter();
  const { projectid } = router.query;
  console.log(projectid);

  return (
    <div>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
};

export default PortfolioProjectPage;

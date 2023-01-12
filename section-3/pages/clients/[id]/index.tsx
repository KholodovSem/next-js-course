import { useRouter } from 'next/router';

const ClientProjectsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>The Projects of a Given Client: {id}</h1>
      <button onClick={() => router.push('/clients/sem/projectA')}>
        Load Project A
      </button>
    </div>
  );
};

export default ClientProjectsPage;

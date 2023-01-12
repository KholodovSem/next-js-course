import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

const UserProfilePage = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <h1>{user.name}</h1>;
};

export default UserProfilePage;

interface DynamicPath {
  userId: string;
}

interface Data {
  user: { id: number; name: string };
}

export const getServerSideProps: GetServerSideProps<Data> = async (
  context: GetServerSidePropsContext<DynamicPath>
) => {
  const { params } = context;
  const users = [
    { id: '1', name: 'Sem' },
    { id: '2', name: 'Konstantin' },
  ];

  const user = users.find(user => user.id === params?.userId);

  if (!user) {
    return { notFound: true };
  }

  return {
    props: {
      user,
    },
  };
};

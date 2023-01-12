import Link from 'next/link';

const ClientsPage = () => {
  const clients = [{ id: 'max' }, { id: 'sem' }];

  const content = clients.map(client => (
    <li key={client.id}>
      <Link href={`clients/${client.id}`}>{client.id}</Link>
    </li>
  ));

  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>{content}</ul>
    </div>
  );
};

export default ClientsPage;

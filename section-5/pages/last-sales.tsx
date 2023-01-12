import { useEffect, useState } from 'react';

interface SalesData {
  amount: 1000;
}

const LastSalesPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<SalesData[]>([]);
  const [error, setError] = useState<{} | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://react-refresher-8e25c-default-rtdb.europe-west1.firebasedatabase.app/lastSales.json'
    )
      .then(res => res.json())
      .then(res => {
        const normalizeData: SalesData[] = [];
        for (let i in res) {
          normalizeData.push(res[i]);
        }
        setData(normalizeData);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>{JSON.stringify(error)}</div>;
  } else {
    content = data.map((item, index) => <div key={index}>{item.amount}</div>);
  }

  return <div>{content}</div>;
};

export default LastSalesPage;

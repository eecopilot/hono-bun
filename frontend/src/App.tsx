// import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';

function App() {
  // const [totalSpent, setTotalSpent] = useState(0);
  const { isPending, error, data } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: async () => {
      const res = await api.expenses['total-spent'].$get();
      const data = await res.json();
      return data;
    },
  });
  // if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  // useEffect(() => {
  //   const fetchTotalSpent = async () => {
  //     const res = await api.expenses['total-spent'].$get();
  //     const data = await res.json();
  //     setTotalSpent(data.total);
  //   };
  //   fetchTotalSpent();
  // }, []);
  return (
    <Card className='w-[350px] m-auto'>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{isPending ? '...' : data.total}</p>
      </CardContent>
    </Card>
  );
}

export default App;

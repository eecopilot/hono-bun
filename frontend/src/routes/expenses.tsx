import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

import { api } from '@/lib/api';
export const Route = createFileRoute('/expenses')({
  component: Expenses,
});

function Expenses() {
  // const [totalSpent, setTotalSpent] = useState(0);
  const { isPending, error, data } = useQuery({
    queryKey: ['get-all-expenses'],
    queryFn: async () => {
      const res = await api.expenses.$get();
      if (!res.ok) {
        throw new Error('server error');
      }
      const data = await res.json();
      return data;
    },
  });
  // if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className='p-2 max-w-3xl m-auto'>
      <Table>
        <TableCaption>A list of your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className='font-medium'>
                      <Skeleton className='h-4' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4' />
                    </TableCell>
                  </TableRow>
                ))
            : data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className='font-medium'>{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}

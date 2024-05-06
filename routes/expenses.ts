import { Hono } from 'hono';

type Expense = {
  id: string;
  title: string;
  amount: number;
  // date: Date;
};

const fakeExpenses: Expense[] = [
  // 生成几个数据
  {
    id: '1',
    title: 'rent',
    amount: 1000,
  },
  {
    id: '2',
    title: 'food',
    amount: 2000,
  },
  {
    id: '3',
    title: 'car',
    amount: 3000,
  },
];

export const expensesRoute = new Hono()
  .get('/', (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post('/', (c) => {
    const expense = c.req.json();
    return c.json({ expense });
  });

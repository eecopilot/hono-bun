import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import z from 'zod';

// 定义数据结构
const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string(),
  amount: z.number(),
  // date: z.date(),
});

// type 从expenseSchema中来
type Expense = z.infer<typeof expenseSchema>;

// 这是一个提交时要的数据结构
// zod validation 可以忽略id
const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  // 生成几个数据
  {
    id: 1,
    title: 'rent',
    amount: 1000,
  },
  {
    id: 2,
    title: 'food',
    amount: 2000,
  },
  {
    id: 3,
    title: 'car',
    amount: 3000,
  },
];

export const expensesRoute = new Hono()
  .get('/', (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post('/', zValidator('json', createPostSchema), (c) => {
    // const data = c.req.json();
    const data = c.req.valid('json');
    const expense = createPostSchema.parse(data);
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json({ expense });
  })
  .get('/total-spent', async (c) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    return c.json({ total: 1092 });
  })
  .get('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const expense = fakeExpenses.find((item) => item.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const index = fakeExpenses.findIndex((item) => item.id === id);
    if (!index) {
      return c.notFound();
    }
    const deleteExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deleteExpense });
  });

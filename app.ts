import { Hono } from 'hono';
import { logger } from 'hono/logger';
// add routes
import { expensesRoute } from './routes/expenses';

const app = new Hono();

// Add logger middleware
app.use('*', logger());

app.get('/', (c) => {
  return c.text('Hello, World!');
});

app.get('/test', (c) => {
  return c.json({ ok: true });
});

app.get('/hello/:name', (c) => {
  const name = c.req.param('name');
  return c.text(`Hello, ${name}!`);
});

app.route('/api/expenses', expensesRoute);

export default app;

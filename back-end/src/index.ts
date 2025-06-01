import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import categories from './routes/categories.js';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('*', cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/categories', categories);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

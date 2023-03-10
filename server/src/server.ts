import Fastify from 'fastify';
import FastifyCors from '@fastify/cors';
import { appRoutes } from './routes';

const app = Fastify({
  logger: true,
});
app.register(FastifyCors);
app.register(appRoutes);

app
  .listen({ port: 3333, host: '0.0.0.0' })
  .then(() => console.log('HTTP server running!'));

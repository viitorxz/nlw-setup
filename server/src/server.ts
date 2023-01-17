import Fastify from 'fastify';
import FastifyCors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const app = Fastify({
  logger: true,
});
app.register(FastifyCors);
const prisma = new PrismaClient();

app.get('/', async (req, reply) => {
  const habits = await prisma.habit.findMany();

  return habits.length > 0 ? habits : 'Não tem nada no array';
});

app.listen({ port: 3333 }).then(() => console.log('HTTP server running!'));

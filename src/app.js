const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const workflowsRouter = require('./routes/workflows');
const logsRouter = require('./routes/logs');

app.use('/api/workflows', workflowsRouter);
app.use('/api/logs', logsRouter);

// Rotas de integrações
app.post('/api/integrations', async (req, res) => {
  const { type, apiKey, endpoint } = req.body;
  try {
    const integration = await prisma.integration.create({
      data: { type, apiKey, endpoint },
    });
    res.json(integration);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/integrations', async (req, res) => {
  const integrations = await prisma.integration.findMany();
  res.json(integrations);
});

// Health check
app.get('/', (req, res) => {
  res.send('Backend PipeDream API rodando!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
}); 
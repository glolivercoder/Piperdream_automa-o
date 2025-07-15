const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar log
router.post('/', async (req, res) => {
  const { workflowId, message, level } = req.body;
  try {
    const log = await prisma.log.create({
      data: { workflowId, message, level },
    });
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar logs
router.get('/', async (req, res) => {
  const logs = await prisma.log.findMany({ include: { workflow: true } });
  res.json(logs);
});

// Buscar log por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const log = await prisma.log.findUnique({ where: { id: Number(id) }, include: { workflow: true } });
  if (!log) return res.status(404).json({ error: 'Log não encontrado' });
  res.json(log);
});

// Deletar log
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.log.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar workflow
router.post('/', async (req, res) => {
  const { name, description, config } = req.body;
  try {
    const workflow = await prisma.workflow.create({
      data: { name, description, config },
    });
    res.json(workflow);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar workflows
router.get('/', async (req, res) => {
  const workflows = await prisma.workflow.findMany();
  res.json(workflows);
});

// Buscar workflow por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const workflow = await prisma.workflow.findUnique({ where: { id: Number(id) } });
  if (!workflow) return res.status(404).json({ error: 'Workflow não encontrado' });
  res.json(workflow);
});

// Atualizar workflow
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, config } = req.body;
  try {
    const workflow = await prisma.workflow.update({
      where: { id: Number(id) },
      data: { name, description, config },
    });
    res.json(workflow);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar workflow
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.workflow.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 
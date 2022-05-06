import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { EnviarFeedbackService } from './services/enviarFeedbackService';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const enviarFeedbackService = new EnviarFeedbackService(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await enviarFeedbackService.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});

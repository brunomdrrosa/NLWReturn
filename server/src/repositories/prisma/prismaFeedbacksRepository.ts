import { prisma } from '../../prisma';
import {
  FeedbacksRepository,
  FeedbackCreateData,
} from '../feedbacksRepository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}

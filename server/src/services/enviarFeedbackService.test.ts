import { EnviarFeedbackService } from './enviarFeedbackService';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const enviarFeedbackService = new EnviarFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Enviar feedback', () => {
  it('deve ser possível enviar um feedback', async () => {
    await expect(
      enviarFeedbackService.execute({
        type: 'bug',
        comment: 'Esse é um bug',
        screenshot: 'data:image/png;base64,...',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('não deve ser possível enviar um feedback sem o tipo', async () => {
    await expect(
      enviarFeedbackService.execute({
        type: '',
        comment: 'Esse é um bug',
        screenshot: 'data:image/png;base64,...',
      })
    ).rejects.toThrow();
  });

  it('não deve ser possível enviar um feedback sem um comentário', async () => {
    await expect(
      enviarFeedbackService.execute({
        type: 'bug',
        comment: '',
        screenshot: 'data:image/png;base64,...',
      })
    ).rejects.toThrow();
  });

  it('não deve ser possível enviar um feedback com uma foto inválida', async () => {
    await expect(
      enviarFeedbackService.execute({
        type: 'bug',
        comment: 'Esse é um bug',
        screenshot: 'foto.jpg',
      })
    ).rejects.toThrow();
  });
});

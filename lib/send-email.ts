import { Resend } from 'resend';
import { render } from '@react-email/render';

export const sendEmail = async (to: string, subject: string, template: any) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  console.log('SEND EMAIL START');

  const html = await render(template);

  console.log('HTML RENDERED');
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject,
    html,
  });

  if (error) {
    console.error('RESEND ERROR:', error); // <<< логируем
    throw new Error();
  }

  console.log('SEND RESULT:', data);

  return data;
};

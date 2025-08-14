import { EmailTemplate } from '@/components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, project, budget, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'Contato Portfólio <Site WEB>',
      to: ['felipe.messias.fms@gmail.com'], 
      subject: `Novo Contato de ${name} - Projeto de ${project}`,
      react: EmailTemplate({ name, email, project, budget, message }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        // Recebe fromEmail do frontend, além de to, subject, text, html
        const { to, subject, text, html, fromEmail } = await request.json();

        // Validação básica do fromEmail
        if (!fromEmail || !to || !subject || !text) {
            return NextResponse.json({ message: 'Missing required email fields (fromEmail, to, subject, text).' }, { status: 400 });
        }

        // Configuração do transporter Nodemailer
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // Ex: "smtp.office365.com" para Outlook, ou host do seu provedor
            port: 465, // Geralmente 587 para TLS, ou 465 para SSL
            secure: false, // true para 465 (SSL), false para 587 (TLS) - dependendo do seu host/porta
            auth: {
                user: process.env.EMAIL_SMTP_USER, // Seu e-mail/usuário SMTP para autenticação
                pass: process.env.EMAIL_SMTP_PASS, // Sua senha ou "App password" SMTP
            },
            tls: {
                rejectUnauthorized: false // Pode ser necessário para alguns hosts. NÃO É RECOMENDADO EM PRODUÇÃO!
            }
        });

        const mailOptions = {
            from: fromEmail, // O remetente visível no e-mail, fornecido pelo usuário do frontend
            replyTo: fromEmail, // Opcional: para que as respostas voltem para o e-mail do usuário
            to: to,          // Destinatário(s)
            subject: subject, // Assunto
            text: text,      // Conteúdo em texto puro
            html: html       // Conteúdo em HTML (opcional)
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Failed to send email.', error: error.message }, { status: 500 });
    }
}
// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { to, subject, text, html } = await request.json();

        // Configuração do transporter Nodemailer
        // ATENÇÃO: Substitua com suas credenciais e serviço de e-mail reais
        // Exemplo para Gmail (requer "App passwords" no Google Account se tiver 2FA)
        // Para outros serviços (Outlook, SendGrid, Mailgun, etc.), consulte a documentação do Nodemailer
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // Ex: "smtp.office365.com" para Outlook, ou host do seu provedor
            port: 587, // Geralmente 587 para TLS, ou 465 para SSL
            secure: false, // true para 465 (SSL), false para 587 (TLS) - dependendo do seu host/porta
            auth: {
                user: process.env.EMAIL_USER, // Seu e-mail (ex: seu.email@gmail.com)
                pass: process.env.EMAIL_PASS, // Sua senha ou "App password"
            },
            tls: {
                rejectUnauthorized: false // Pode ser necessário para alguns hosts, mas não é recomendado para produção
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Remetente
            to: to,      // Destinatário(s)
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
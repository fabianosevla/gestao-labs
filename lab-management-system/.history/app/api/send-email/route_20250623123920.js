// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { to, subject, text, html, fromEmail } = await request.json(); // fromEmail é o email do visitante

        // Validação básica dos campos recebidos do frontend
        if (!fromEmail || !to || !subject || !text) {
            return NextResponse.json({ message: 'Missing required email fields (fromEmail, to, subject, text).' }, { status: 400 });
        }

        // --- ESTE É O PONTO CRÍTICO ---
        // O e-mail que será usado no campo 'FROM' do e-mail (o que a Brevo AUTENTICARÁ)
        // DEVE ser o e-mail que você verificou no painel da Brevo.
        const brevoAuthenticatedSender = process.env.BREVO_VERIFIED_SENDER_EMAIL;

        // Configuração do transporter Nodemailer para Brevo (sem alterações aqui)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: process.env.SMTP_PORT === "465",
            auth: {
                user: process.env.SMTP_USER, // Tem que ser EXATAMENTE 'SMTP_USER'
                pass: process.env.SMTP_PASS, // Tem que ser EXATAMENTE 'SMTP_PASS'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Constrói o objeto da mensagem
        const mailOptions = {
            to: to, // Este é o e-mail do responsável pelo laboratório (varia por requisição)

            // O CAMPO FROM:
            // O 'email' aqui DEVE ser o e-mail verificado na Brevo para autenticação.
            // O 'name' pode ser personalizado para indicar o e-mail do visitante.
            from: {
                email: brevoAuthenticatedSender, // Email verificado na Brevo
                name: `Solicitação Lab UNIFEI (De: ${fromEmail})` // Exibe o email do visitante no nome do remetente
            },

            // O CAMPO REPLY-TO:
            // Isso é o que faz as respostas do destinatário voltarem para o e-mail do visitante.
            replyTo: fromEmail, // Respostas para este e-mail irão para o visitante

            subject: subject,
            text: text,
            html: html,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Error sending email with Brevo (Nodemailer):', error);
        let errorMessage = 'Failed to send email.';
        if (error.code === 'EAUTH') {
            errorMessage = 'Authentication failed. Please check SMTP_USER and SMTP_PASS in .env.local for Brevo.';
        } else if (error.message) {
            errorMessage += ` Details: ${error.message}`;
        }
        return NextResponse.json({ message: errorMessage, error: error.message }, { status: 500 });
    }
}
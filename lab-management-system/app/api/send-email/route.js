// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { to, subject, text, html, fromEmail } = await request.json();

        // Validação básica dos campos recebidos do frontend
        if (!fromEmail || !to || !subject || !text) {
            return NextResponse.json({ message: 'Missing required email fields (fromEmail, to, subject, text).' }, { status: 400 });
        }

        // O e-mail que será usado no campo 'FROM' do e-mail (o que a Brevo AUTENTICARÁ)
        // DEVE ser o e-mail que você verificou no painel da Brevo.
        const brevoAuthenticatedSender = process.env.BREVO_VERIFIED_SENDER_EMAIL;

        // DEBUG LOGS (podem ser removidos após a depuração)
        console.log("DEBUG: Valor de BREVO_VERIFIED_SENDER_EMAIL:", process.env.BREVO_VERIFIED_SENDER_EMAIL);
        console.log("DEBUG: E-mail FROM real usado no Nodemailer:", brevoAuthenticatedSender);
        // FIM DEBUG LOGS

        // Configuração do transporter Nodemailer para Brevo
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: process.env.SMTP_PORT === "465", // true para porta 465 (SSL), false para 587 (TLS)
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false // Mantenha para desenvolvimento, remova em produção se possível
            }
        });

        // Constrói o objeto da mensagem
        const mailOptions = {
            to: to, // Este é o e-mail do responsável pelo laboratório (varia por requisição)

            // O CAMPO FROM:
            from: {
                email: brevoAuthenticatedSender, // Email verificado na Brevo
                name: `Solicitação Lab UNIFEI (De: ${fromEmail})` // Exibe o email do visitante no nome do remetente
            },

            // O CAMPO REPLY-TO:
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
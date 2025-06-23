// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { to, subject, text, html, fromEmail } = await request.json();

        // ... (restante do seu código) ...

        // --- DEBUG LOG CRÍTICO ---
        console.log("DEBUG: Valor de BREVO_VERIFIED_SENDER_EMAIL:", process.env.BREVO_VERIFIED_SENDER_EMAIL);
        console.log("DEBUG: E-mail FROM real usado no Nodemailer:", brevoAuthenticatedSender);
        // --- FIM DEBUG LOG ---

        const transporter = nodemailer.createTransport({
            // ... (seu código do transporter) ...
        });

        const mailOptions = {
            to: to,
            from: {
                email: brevoAuthenticatedSender, // Este é o valor que a Brevo está rejeitando
                name: `Solicitação Lab UNIFEI (De: ${fromEmail})`
            },
            replyTo: fromEmail,
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
import "./globals.css";
import ClientWrapper from "./client-wrapper";

export const metadata = {
  title: "Gerenciamento de Laboratórios",
  description: "Sistema de gerenciamento de laboratórios da Universidade Federal de Itajubá",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
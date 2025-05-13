import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "./auth/AuthContext";

export const metadata = {
  title: "Gerenciamento de Laboratórios",
  description: "Sistema de gerenciamento de laboratórios da Universidade Federal de Itajubá",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
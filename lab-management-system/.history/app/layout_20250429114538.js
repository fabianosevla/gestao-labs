import Navbar from "../components/Navbar";
import "../app/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white font-sans">
        <Navbar />
        <div className="max-w-7xl mx-auto pt-16 px-4">{children}</div>
      </body>
    </html>
  );
}
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  const showNavbar = !["/login"].includes(children.props.childPropSegment);

  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">
        {showNavbar && <Navbar />}
        <div className="max-w-7xl mx-auto py-8 px-4">{children}</div>
      </body>
    </html>
  );
}
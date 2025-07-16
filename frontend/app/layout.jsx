import Provider from "../components/AuthProvider";
import Navbar from "../components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
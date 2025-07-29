/* eslint-disable react/react-in-jsx-scope */
import "./globals.css";
import SideBar from "@/components/sidebar";
import { AuthProvider } from "@/context/AuthContext";
import { ProductProvider } from "@/context/ProductContext";

export const metadata = {
  title: "REX - ADMIN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body className="bg-white text-black" style={{ colorScheme: 'light' }}>
        <AuthProvider>
          <ProductProvider>
            <main className="w-full h-screen flex bg-white">
              <div className="w-1/4 border-r border-black bg-white">
                <SideBar />
              </div>
              <div className="w-3/4 overflow-y-auto bg-white">{children}</div>
            </main>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
/* eslint-disable react/react-in-jsx-scope */
import "./globals.css";
import SideBar from "@/components/sidebar";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "REX - ADMIN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <main className="w-full h-screen flex">
            <div className="w-1/4 border-r border-black">
              <SideBar />
            </div>
            <div className="w-3/4 overflow-y-auto">{children}</div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

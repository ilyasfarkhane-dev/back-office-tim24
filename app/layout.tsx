import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SignIn from "@/components/Sign-in"; // Import the SignIn component

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TIM CONFERENCE",
  description: "Conference on Timeliness",
  icons: {
    icon: "/favicon1.png", // Link to your favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = false; // Replace with your authentication logic

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isAuthenticated ? (
          <>
            <Sidebar />
            {/* Main content */}
            <main className="py-10 lg:pl-72">
              <div className="px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
          </>
        ) : (
          <SignIn /> // Render the sign-in page if not authenticated
        )}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientAudioProvider from "../components/AudioProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music Label Hub",
  description: "Discover and stream music from talented artists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="bg-gray-800 p-4">
          <div className="max-w-6xl mx-auto flex justify-between">
            <a href="/" className="text-white font-bold">Music Label Hub</a>
            <div className="space-x-4">
              <a href="/" className="text-white hover:text-gray-300">Home</a>
              <a href="/signup" className="text-white hover:text-gray-300">Sign Up</a>
              <a href="/upload" className="text-white hover:text-gray-300">Upload</a>
              <a href="/download" className="text-white hover:text-gray-300">Download</a>
            </div>
          </div>
        </nav>
        <ClientAudioProvider>
          {children}
        </ClientAudioProvider>
      </body>
    </html>
  );
}

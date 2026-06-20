import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "@objectifthunes/react-three-book — API reference & live demo",
  description:
    "Live, source-paired reference for @objectifthunes/react-three-book — declarative React components for a realistic 3D page-turning book in React Three Fiber.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";

export const metadata: Metadata = {
  title: "OmmaTeam",
  description: "OmmaTeam - Perform team tasks conveniently and quickly",
  icons: {
    icon: '/icons/OmmaTeam.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <RootLayoutClient>
            {children}
          </RootLayoutClient>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "StayHub",
  description: "Administrador de centros de hospedaje",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        {children}

      </body>
    </html>
  )
}


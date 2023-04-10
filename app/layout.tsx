import './globals.css'
import { Nunito } from 'next/font/google';
import React from "react";

const font = Nunito({
  subsets:['latin']
})
export const metadata = {
  title: 'inHome',
  description: 'Rent your room!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}

import './globals.css';
import { Nunito } from 'next/font/google';
import React from 'react';
import Navbar from '@/app/components/navbar/Navbar';
import Modal from '@/app/components/modals/Modal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import ToasterProvider from '@/app/Providers/ToasterProvider';

const font = Nunito({
  subsets: ['latin'],
});
export const metadata = {
  title: 'inHome',
  description: 'Rent your room!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModal />
        <Navbar />
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}

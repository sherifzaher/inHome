import './globals.css';
import { Nunito } from 'next/font/google';
import React from 'react';
import Navbar from '@/app/components/navbar/Navbar';
import Modal from '@/app/components/modals/Modal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import ToasterProvider from '@/app/Providers/ToasterProvider';
import LoginModal from '@/app/components/modals/LoginModal';
import getCurrentUser from '@/app/actions/getCurrentUser';

const font = Nunito({
  subsets: ['latin'],
});
export const metadata = {
  title: 'inHome',
  description: 'Rent your room!',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}

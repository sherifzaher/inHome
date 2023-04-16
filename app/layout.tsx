import './globals.css';
import { Nunito } from 'next/font/google';
import React from 'react';
import Navbar from '@/app/components/navbar/Navbar';
import RegisterModal from '@/app/components/modals/RegisterModal';
import LoginModal from '@/app/components/modals/LoginModal';
import RentModal from '@/app/components/modals/RentModal';
import ToasterProvider from '@/app/providers/ToasterProvider';
import getCurrentUser from '@/app/actions/getCurrentUser';
import SearchModal from '@/app/components/modals/SearchModal';
import ClientComponent from '@/app/components/ClientComponent';

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
        <ClientComponent>
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
          <ToasterProvider />
        </ClientComponent>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}

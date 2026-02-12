import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import '@/styles/global.scss';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'The Borrow Club',
  description: 'A shared physical media library',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rubik.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

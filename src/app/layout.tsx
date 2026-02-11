import type { Metadata } from 'next';
import { Neuton, Montserrat } from 'next/font/google';
import '@/styles/global.scss';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

const neuton = Neuton({
  variable: '--font-neuton',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '700'],
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
    <html lang="en">
      <body className={`${neuton.variable} ${montserrat.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

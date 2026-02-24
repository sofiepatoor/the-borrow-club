import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import TiffanyLaurence from 'next/font/local';
import '@/styles/global.scss';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const tiffanyLaurence = TiffanyLaurence({
  variable: '--font-tiffany-laurence',
  src: '../styles/fonts/tiffany-laurence.woff2',
  weight: '400',
  style: 'normal',
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
    <html lang="en" className={`${geist.variable} ${tiffanyLaurence.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

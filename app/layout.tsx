import type {Metadata} from 'next';
import { Inter, Poppins, Kode_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const kodeMono = Kode_Mono({
  subsets: ['latin'],
  variable: '--font-kode-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Reliant Fincare | Smart Loans. Faster Approvals.',
  description: 'Reliant Fincare Pvt Ltd - Financial Service Industry. Home Loans, Education Loans, Personal Loans, Business Loans, Mortgage Loans, Car Loans.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable} ${kodeMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://logo.clearbit.com" />
        <link rel="dns-prefetch" href="https://logo.clearbit.com" />
      </head>
      <body className="font-sans antialiased text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

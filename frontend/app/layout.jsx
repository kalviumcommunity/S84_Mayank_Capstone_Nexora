import React from "react";
import { Inter, Outfit } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-heading' });

export const metadata = {
    title: 'Nexora | Student Productivity Hub',
    description: 'A centralized platform for students to manage tasks, access resources, and stay updated with campus events.',
    icons: {
        icon: [
            {
                url: '/icon-light-32x32.png',
                media: '(prefers-color-scheme: light)',
            },
            {
                url: '/icon-dark-32x32.png',
                media: '(prefers-color-scheme: dark)',
            },
            {
                url: '/icon.svg',
                type: 'image/svg+xml',
            },
        ],
        apple: '/apple-icon.png',
    },
};
export const viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#1a1d24' },
    ],
    width: 'device-width',
    initialScale: 1,
};
export default function RootLayout({ children, }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`} style={{ fontFamily: 'var(--font-sans)' }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    );
}

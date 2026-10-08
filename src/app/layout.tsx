import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pakistan's Smart Qr code Stand: Get reviews, social follows & Payment – TapScan.pk",
  description:
    "Boost your business with Tapscan.pk — Pakistan’s #1 NFC and QR code stand solution for instant Google reviews, quick social media follows, and seamless scan-to-pay payments.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

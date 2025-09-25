import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';


export default function RootLayout({ // En vuelve todo en una estructura html con body.
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

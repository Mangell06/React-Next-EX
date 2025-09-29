// importa componentes del SideNav, y un componente de metadatos.
import SideNav from '@/app/ui/dashboard/sidenav';
import { Metadata } from 'next';
 
export const metadata: Metadata = { // Crea la metadata
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export const experimental_ppr = true; // Exporta una constante, para un tipo de carga mas inteligente y la deja en true.
export default function Layout({ children }: { children: React.ReactNode }) { // Esto funciona como la plantilla donde Children es el page.tsx, y el resto es la plantilla de este directorio, y todos los hijos que no tengan Layout.tsx propio.
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
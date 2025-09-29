import { Inter, Lusitana } from 'next/font/google'; //Importamos las fuentes
 
export const inter = Inter({ subsets: ['latin'] }); // Preparamos la letra inter para usar solo caracters latinos.

export const lusitana = Lusitana({ // Exportar fuente ya configurada y puedes usar la normal de 400 o la mas gruesa de 700
  weight: ['400', '700'],
  subsets: ['latin'],
});
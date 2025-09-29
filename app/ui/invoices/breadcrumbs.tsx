import { clsx } from 'clsx';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

interface Breadcrumb { //Contiene un label, una url, y si actualemente esta o no en esa pagina.
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({ // Mantiene un pequeño hisorial de las paginas a las que has entrado, permitiendo volver hacia atras y entre otras funciones, permite que personas que usen lector de pantalla sepan su recorrido mejor.
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[]; //El historial decada pagina lo mantiene en una lista.
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx(lusitana.className, 'flex text-xl md:text-2xl')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

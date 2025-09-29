import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // El boton siempre tendra algo dentro.
}

export function Button({ children, className, ...rest }: ButtonProps) { // Construye el boton con un estilo estandar para todos, que se puede sustituir desde fuera, además recibe el resto de atributos del boton.
  return (
    <button
      {...rest} 
      className={clsx(
        'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}

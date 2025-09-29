'use client'; // Se ejecuta en el lado del cliente
 
import { useEffect } from 'react';
 
// Controla los errores y muestra el mensaje "Something went wrong!" cada vez que ocurre.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }; // Recibe el error
  reset: () => void; // Recibe una funcion anonima que resetea todo a su estado normal.
}) {
  useEffect(() => {
    console.error(error); // Log en consola del error.
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2> // Avisa de que a habido un error
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          () => reset() // Cuando le hacemoz click al boton hace el reset.
        }
      >
        Try again
      </button>
    </main>
  );
}
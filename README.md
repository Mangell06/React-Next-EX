*Esta web esta hecha a base de react y typescript*

La estructura se basa en:

/layout.tsx : Define la estructura común (layout) para todas las páginas de la app.

/page.tsx : Página principal del sitio, renderizada en la ruta raíz (/).

/loading.tsx : Muestra un estado de carga mientras se renderiza la página.

/error.tsx : Página de error que se muestra si ocurre una excepción en la ruta.

/not-found.tsx : Página 404 que se muestra cuando no se encuentra la ruta solicitada.

/[route]/page.tsx : Página específica para una subruta dinámica o estática.

/[route]/layout.tsx : Layout personalizado para una subruta, anidado al layout principal.

/components/Navbar.tsx : Componente de navegación general, normalmente incluido en el layout.

/next.config.js : Configuración general del proyecto Next.js.

/tsconfig.json : Configuración de TypeScript para el proyecto.

/app/globals.css : Estilos globales aplicados a toda la aplicación.

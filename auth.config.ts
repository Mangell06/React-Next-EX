// Importamos el tipo, para la configuracion de la autentificacion en la web.
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = { // Exportamos la constante, que tiene la ruta de la pagina de login.
  pages: {
    signIn: '/login',
  },
 
callbacks: { // Hazemos una llamada para validar el usuario.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) { // Si no esta aun logeado o antes a cerrado sesion.
        if (isLoggedIn) return true; // Si es valido de vuelve True.
        return false; // Si no de vuelve false.
      } else if (isLoggedIn) { // Si esta logeado, lo redirigimos directamente.
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
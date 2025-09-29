'use server'; // Se ejecuta del lado del servidor

import { z } from 'zod'; // Funciona como un validador, para evitar datos erroneos que peten el programa.
import postgres from 'postgres';
import { redirect } from 'next/navigation'; // Permite redirigir al usuario a otra url.
import { revalidatePath } from 'next/cache'; // Permite recargar los datos en cache de la web.
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' }); // Para acceder a las variables Generales que son necesarias debemos hacer process.env.NOMBRE_VARIABLE
 
const FormSchema = z.object({ //Schema de objeto para los formularios.
  id: z.string(),
  customerId: z.string({
  invalid_type_error: 'Please select a customer.',}),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
    }),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true }); // Constante de formulario que obliga a tener la id.
const UpdateInvoice = FormSchema.omit({ id: true, date: true }); // Constante de formulario que obliga a tener la id.

export type State = { // tipo state para controlar errores todos los parametros son opcionales.
  errors?: { // Aqui guarda el campo donde tiene un problema.
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) { // Funcion asincrona que controla la creacion de una factura.
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({ // Revisa que todo este bien.
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, prevState: State, formData: FormData) { // Funcion asincrona que controla los cambios en una factura.
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
  const { customerId, amount, status } = validatedFields.data; // Separa los datos del interior en tres variables.
  const amountInCents = amount * 100; // Pasamos el amount a centimos.
  const date = new Date().toISOString().split('T')[0]; // Creamos una fecha quitando la hora y pasandolo a String pero con formato ISO YYYY-MM-DD.
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices'); // Recarga los datos
  redirect('/dashboard/invoices'); // Redirige el usuario a Invoices
}

export async function deleteInvoice(id: string) { // Funcion asincrona que controla la eliminacion de una factura.
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
}

export async function authenticate( // Se encarga de los errores de la authentificacion
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData); // Prueba a iniciar sesion con los datos proporcionados.
  } catch (error) {
    if (error instanceof AuthError) { // Si no puede porque a fallado la autenticacion.
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'; // En el caso de las credenciales de vuelve credenciales invalidas
        default:
          return 'Something went wrong.'; // En cualquier otro caso que a habido un error
      }
    }
    throw error;
  }
}
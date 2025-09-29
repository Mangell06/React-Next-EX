// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
// Define los type generales que se usan en varios scripts.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
}; // El tipo usuario contiene una id, un nombre, un email y una contraseña.

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
}; // El tipo cliente contiene una id, un nombre, un correo y una url de su imagen de perfil.

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
}; // Una factura tiene una id, la id del cliente, la cantidad, la fecha y dos tipos de status que son pendiente o pagado.

export type Revenue = {
  month: string;
  revenue: number;
}; // Los ingresos tienen un mes y la cantidad.

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
}; // Las facturas recientes deben tener una id, un nombre, una url de una imagen, un correo y la cantidad.

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};  // Este tipo es casi el mismo que el anterior, pero quita el amount : String, por un amount: number, para hacer calculos principalmente.

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
}; // Cada fila de la tabla tiene la id de la factura, la id del cliente, el nombre, correo, url de la imagen, fecha, cantidad y su estado si esta pagado o pendiente.

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
}; // Cada fila de la tabla de clientes, tiene la id del cliente, su nombre, su correo, la url de su imagen, el total de las facturas, el total pendiente y el total pagado.

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
}; // Esta es igual que la anterior, pero esta centrada en mostrar, por eso recoge el total_pending y total_paid como una cadena.

export type CustomerField = {
  id: string;
  name: string;
}; // Recoge solo la id y nombre del cliente.

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
}; // Los datos que se recogen en el formulario de facturas es la id de la factura, la id del cliente, la cantidad y el status.

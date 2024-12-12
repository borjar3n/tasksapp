import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_CLIENT;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Prueba de conexión
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('tasks').select('*').limit(1);
    if (error) {
      console.error('Error al conectar con Supabase:', error);
    } else {
      console.log('Conexión exitosa. Datos:', data);
    }
  } catch (err) {
    console.error('Error inesperado:', err);
  }
};

export default supabase;

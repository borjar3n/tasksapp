import React, { useEffect } from 'react';
import { testConnection } from '@app/supabaseClient';
import TaskList from '@/crud/TaskList';
import TaskForm from '@/crud/TaskForm';

export default function App() {
  useEffect(() => {
    testConnection(); // Llama a la prueba de conexión al cargar la app
  }, []);

  return (
    <div>
      <TaskList />
      <TaskForm />
    </div>
  );
}

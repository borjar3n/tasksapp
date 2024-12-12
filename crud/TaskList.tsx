import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import supabase from '@app/supabaseClient';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  reload?: boolean; // Hacer reload opcional y de tipo booleano
}

const TaskList: React.FC<TaskListProps> = ({ reload }) => { // Eliminar onSave y onCancel si no los usas
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: false });
    if (!error && data) setTasks(data as Task[]);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Actualización de tareas condicional con flag reload:
  useEffect(() => {
    if (reload) {
      fetchTasks(); // Recarga las tareas cuando cambia `reload`
    }
  }, [reload]);

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.taskItem}>
          <Text style={styles.taskText}>
            {item.title} - {item.completed ? '✅' : '❌'}
          </Text>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#333',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#444',
    borderWidth: 1,
  },
  taskText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TaskList;
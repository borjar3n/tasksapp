import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import supabase from '@app/supabaseClient';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskFormProps {
  task?: Task;
  onSave: (task: Task) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  const handleSubmit = () => {
    // Ensure all required properties are present
    const updatedTask: Task = {
      id: task?.id || 0, // Use existing ID or default to 0
      title,
      description,
      completed: task?.completed || false // Preserve existing completed status or default to false
    };
    
    console.log('form:', updatedTask);
    onSave(updatedTask);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task ? 'Editar Tarea' : 'Crear Tarea'}</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={[styles.input, styles.textarea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción"
        placeholderTextColor="#ccc"
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      {onCancel && (
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    color: 'white',
    backgroundColor: '#333',
    marginBottom: 10,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#6c757d', // A neutral gray color for cancel
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskForm;
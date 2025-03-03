
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TaskContext';

const TaskForm = () => {
  const { addTask } = useTasks();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    addTask({ id: Date.now(), name: data.name, status: 'pendiente' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name', { required: 'Este campo es obligatorio' })}
        placeholder="Nombre de la tarea"
      />
      {errors.name && <p>{errors.name.message}</p>}
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default TaskForm;

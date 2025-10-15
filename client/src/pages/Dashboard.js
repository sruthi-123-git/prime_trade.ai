import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  const handleCreate = async () => {
    await api.post('/tasks', { title });
    setTitle('');
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task" className="border p-1 mr-2" />
      <button onClick={handleCreate} className="bg-blue-600 text-white px-3 py-1">Add</button>
      <ul className="mt-4">
        {tasks.map(task => (
          <li key={task.id} className="mb-2 flex justify-between">
            {task.title}
            <button onClick={() => handleDelete(task.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

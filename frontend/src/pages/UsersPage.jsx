import { useState } from 'react';
import axios from 'axios';

export default function UsersPage() {
  const [form, setForm] = useState({ username: '', name: '', email: ''});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users', form)
      .then(() => setMessage('User created successfully!'))
      .catch(() => setMessage('Error creating user.'));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border p-2 w-full" type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input className="border p-2 w-full" type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input className="border p-2 w-full" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-xl" type="submit">Sign Up</button>
      </form>
      {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
    </div>
  );
}
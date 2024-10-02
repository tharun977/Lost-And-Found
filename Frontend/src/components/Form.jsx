// Form.jsx
import React, { useState } from 'react';
import axios from 'axios';
import ItemList from './ItemList'; // Ensure the path is correct
import { api } from '../config'; // Ensure the path is correct

export default function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneNo] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phoneno', phoneno);
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post(`${api}/item`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Reset form fields after submission
      setName('');
      setEmail('');
      setPhoneNo('');
      setTitle('');
      setDescription('');
      setFile(null);
      // Optionally, you can refresh the item list here if needed
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>Please fill all the required fields</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="phoneno">Phone </label>
        <input
          type="tel"
          id="phoneno"
          value={phoneno}
          onChange={(e) => setPhoneNo(e.target.value)}
          required
        />

        <label htmlFor="title">Title </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Description </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label htmlFor="file">File </label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <input type="submit" value="Submit" />
      </form>

      <ItemList /> {/* Render the item list below the form */}
    </div>
  );
}

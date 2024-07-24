import React, { useState } from 'react';
import { db } from '../firebase'; // Ensure the import path is correct
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const eventsCollection = collection(db, 'events');
      await addDoc(eventsCollection, {
        title,
        date,
        description,
      });
      alert('Event added successfully!');
      navigate('/calendar');
    } catch (error) {
      console.error("Error adding event: ", error.message);
      alert(`Error adding event: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold">Add Event</h1>
      <form onSubmit={handleAddEvent}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">Event Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium">Event Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">Event Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;

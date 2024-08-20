import React, { useState } from 'react';
import { db } from '../firebase'; // Ensure the import path is correct
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [addedEvents, setAddedEvents] = useState([]); // State to store added events
  const navigate = useNavigate();

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const eventsCollection = collection(db, 'events');
      const docRef = await addDoc(eventsCollection, {
        title,
        date,
        description,
      });

      // Update the local state with the added event
      setAddedEvents([...addedEvents, { id: docRef.id, title, date, description }]);

      alert('Event added successfully!');
      navigate('/calendar'); // Change the route if needed
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

      {/* Display the list of added events */}
      <div className="mt-5">
        <h2 className="text-xl font-semibold">Added Events</h2>
        <ul className="mt-2">
          {addedEvents.map((event) => (
            <li key={event.id} className="border-b border-gray-300 py-2">
              <h3 className="text-lg font-bold">{event.title}</h3>
              <p className="text-sm">Date: {event.date}</p>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddEvent;

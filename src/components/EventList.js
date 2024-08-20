import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Ensure the import path is correct
import { collection, getDocs } from 'firebase/firestore';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventSnapshot = await getDocs(eventsCollection);
        const eventList = eventSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events: ", error.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold">Event List</h1>
      <ul>
        {events.map(event => (
          <li key={event.id} className="mb-4 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Description:</strong> {event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;

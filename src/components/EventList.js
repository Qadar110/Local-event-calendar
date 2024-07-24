import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure you are using 'db' if needed
import UpdateEvent from './UpdateEvent';

const EventList = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const fetchEvents = async () => {
      const firestore = getFirestore();
      const eventsCollection = collection(firestore, 'events');
      const eventSnapshot = await getDocs(eventsCollection);
      const eventList = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventList);
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    const eventDoc = doc(db, 'events', eventId);
    await deleteDoc(eventDoc);
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div>
      <h1>Event List</h1>
      {events.map(event => (
        <div key={event.id}>
          <span>{event.title}</span>
          <button onClick={() => handleDelete(event.id)}>Delete</button>
          <UpdateEvent eventId={event.id} />
        </div>
      ))}
    </div>
  );
};

export default EventList;

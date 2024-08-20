import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const UpdateEvent = ({ eventId }) => {
  const [eventData, setEventData] = useState({ /* initial state */ });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    const eventDoc = doc(db, 'events', eventId);
    await updateDoc(eventDoc, eventData);
    // Handle success or error
  };

  return (
    <div>
      {/* Form or UI to update event */}
      <input
        type="text"
        name="eventName"
        value={eventData.eventName || ''}
        onChange={handleInputChange}
      />
      {/* More input fields as needed */}
      <button onClick={handleUpdate}>Update Event</button>
    </div>
  );
};

export default UpdateEvent;

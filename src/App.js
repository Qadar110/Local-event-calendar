import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EventCalendar from './pages/EventCalendar';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import EventList from './components/EventList';
import AddEvent from './components/AddEvent'; // Ensure this import matches your file structure

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/calendar" element={<ProtectedRoute><EventCalendar /></ProtectedRoute>} />
        <Route path="/event-list" element={<ProtectedRoute><EventList /></ProtectedRoute>} />
        <Route path="/add-event" element={<ProtectedRoute><AddEvent /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;

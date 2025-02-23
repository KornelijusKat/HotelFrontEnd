import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import ReservationPage from '../components/ReservationForm';
import ReservationList from '../components/ReservationList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RoomDetailsPage from '../components/roomDetails';


const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
    <Header />
    <div className="flex-grow">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/reserve/:id" element={<ReservationPage />} />
        <Route path="/reservations" element={<ReservationList />} />
        <Route path='/room/:id' element={<RoomDetailsPage/>}/>
      </Routes>
    </div>
    <Footer />
  </div>
  );
};

export default App;
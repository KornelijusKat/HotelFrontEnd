import React, { useState, useEffect } from 'react';
import apiService from '../src/services/apiService';
import { useLocation } from 'react-router-dom';
const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const location = useLocation();

    const [search, setSearch] = useState({ name: '', code: '' });
    const [error, setError] = useState('');
    useEffect(() => {
        if (location.state?.newReservation) {
            setReservations(prev => {
                const isDuplicate = prev.some(res => res.code === location.state.newReservation.code);
                return isDuplicate ? prev : [...prev, location.state.newReservation];
            });
        }
    }, [location.state]);
    const handleSearchChange = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const data = await apiService.getUserReservations(search);
        if (data.error) {
            setError(data.error);
        } else {
            setReservations(data.formattedRes);
            setError('');
        }
    };
    const handleCancel = async (reservationId) => {
        if (!window.confirm("Are you sure you want to cancel this reservation?")) {
            return;
        }
        console.log(reservationId);
        try {
            const data = await apiService.cancelReservation(reservationId, search);
            if (data.error) {
                setError(data.error);
            } else {
                setReservations(reservations.filter(res => res.id !== reservationId));
            }
        } catch (error) {
            setError("Failed to cancel reservation. Please try again.");
        }
    };
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Retrieve Your Reservation</h2>
            <form className="row g-3" onSubmit={handleSearch}>
                <div className="col-md-6">
                    <input type="text" name="name" placeholder="Name" value={search.name} onChange={handleSearchChange} className="form-control" required />
                </div>
                <div className="col-md-6">
                    <input type="text" name="code" placeholder="Reservation Code" value={search.code} onChange={handleSearchChange} className="form-control" required />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">Search</button>
                </div>
            </form>
            {error && <p className="alert alert-danger text-center mt-3">{error}</p>}
            {reservations.length > 0 && (
                <div className="card p-4 shadow-sm mt-4">
                    <h3 className="text-center">Your Reservation</h3>
                    {reservations.map((res, index) => (
                        <div key={index} className="card shadow-sm p-3 mt-3">
                            <p><strong>Code:</strong> {res.code}</p>
                            <p><strong>Room:</strong> {res.reservation_information.room.number}</p>
                            <p><strong>Check-in:</strong> {new Date(res.reservation_information.checkin).toLocaleDateString()}</p>
                            <p><strong>Check-out:</strong> {new Date(res.reservation_information.checkout).toLocaleDateString()}</p>
                            <button className="btn btn-danger mt-2 w-100" onClick={() => handleCancel(res.id)}>Cancel Reservation</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReservationList;

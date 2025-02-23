import React, { useState, useEffect } from 'react';
import apiService from '../src/services/apiService';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ from: '', to: '' });

    useEffect(() => {
        apiService.getRooms().then((data) => {
            if (data && data.rooms && Array.isArray(data.rooms.rooms)) {
                setRooms(data.rooms.rooms);
                setFilteredRooms(data.rooms.rooms); 
            } else {
                setRooms([]);
                setFilteredRooms([]);
            }
        });
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleAvailabilityCheck = async () => {
        if (!filters.from || !filters.to) {
            setError("Please select both check-in and check-out dates.");
            return;
        }
        setError(null);
        try {
            const data = await apiService.checkRoomAvailability(filters.from, filters.to);
            if (data && data.rooms && Array.isArray(data.rooms)) { 
                const availableRoomIds = data.rooms.filter(room => room.availability).map(room => room.id);
                const filtered = rooms.filter(room => availableRoomIds.includes(room._id));
                setFilteredRooms(filtered);
            } else {
                setFilteredRooms([]);
            }
        } catch (error) {
            setFilteredRooms([]);
            setError("Failed to check availability. Please try again later.");
        }
    };
    const handleCancelFilter = () => {
        setFilteredRooms(rooms);
        setFilters({ from: '', to: '' });
    };
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Discover Rooms</h2>
            <div className="row mb-4">
                <div className="col-md-4 mb-2">
                    <input type="date" name="from" value={filters.from} onChange={handleFilterChange} className="form-control" />
                </div>
                <div className="col-md-4 mb-2">
                    <input type="date" name="to" value={filters.to} onChange={handleFilterChange} className="form-control" />
                </div>
                <div className="col-md-2 mb-2">
                    <button className="btn btn-primary w-100" onClick={handleAvailabilityCheck}>Check Availability</button>
                </div>
                <div className="col-md-2 mb-2">
                    <button className="btn btn-danger w-100" onClick={handleCancelFilter}>Cancel Filter</button>
                </div>
            </div>
            {error && <p className="alert alert-danger text-center">{error}</p>}
            {filteredRooms.length === 0 ? (
                <p className="text-center">No rooms are matching the current filter criteria.</p>
            ) : (
                <div className="row">
                    {filteredRooms.map((room, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img src={room.roomImage} alt={room.number} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{room.number}</h5>
                                    <p className="card-text">Capacity: {room.capacity}</p>
                                    <p className="card-text">{room.wifi ? '📶 Wifi Available' : '🚫 No Wifi'}</p>
                                    <p className="card-text">{room.parking ? '🅿️ Parking Available' : '🚫 No Parking'}</p>
                                    <Link to={`/room/${room._id}`} className="btn btn-dark w-100">More Info</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LandingPage;

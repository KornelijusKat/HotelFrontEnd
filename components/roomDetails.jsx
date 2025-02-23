import React, { useState, useEffect } from 'react';
import apiService from '../src/services/apiService';
import { useParams, useNavigate } from 'react-router-dom';


const RoomDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        console.log(id)
        apiService.getRoomById(id).then((data) => {
        console.log(data)
        if (data && data.rooms.room) {
            setRoom(data.rooms.room);
        } else {
            setError("Room not found.");
        }
        }).catch(err => {
        console.error("Error fetching room:", err);
        setError("Failed to load room details.");
        });
    }, [id]);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Room Details</h2>
            {error && <p className="alert alert-danger text-center">{error}</p>}
            {room && (
                <div className="card mx-auto shadow-lg" style={{ maxWidth: '800px' }}>
                    <img src={room.roomImage} alt={room.name} className="card-img-top" style={{ height: '300px', objectFit: 'cover' }} />
                    <div className="card-body">
                        <h3 className="card-title text-center">{room.name}</h3>
                        <p className="card-text text-muted text-center">{room.description}</p>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Capacity:</strong> {room.capacity} persons</li>
                            <li className="list-group-item"><strong>Wifi:</strong> {room.wifi ? '✅ Available' : 'Not Available'}</li>
                            <li className="list-group-item"><strong>Parking:</strong> {room.parking ? '✅ Available' : 'Not Available'}</li>
                            <li className="list-group-item"><strong>Price per night:</strong> ${room.price}</li>
                            <li className="list-group-item"><strong>Amenities:</strong> {room.amenities?.join(', ') || 'No amenities listed'}</li>
                        </ul>
                        <div className="d-grid gap-2 mt-3">
                            <button onClick={() => navigate(`/reserve/${id}`)} className="btn btn-primary">Reserve This Room</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomDetailsPage;

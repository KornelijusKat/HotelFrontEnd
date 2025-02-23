import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import apiService from '../src/services/apiService';


const ReservationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', address: '', city: '', zip: '', country: '', checkin: '', checkout: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.reserveRoom(id, formData);
      if (response && response.reservations) {
        navigate("/reservations");
      } else {
        setError("Reservation failed. Room already taken.");
      }
    } catch (err) {
      console.error("Error making reservation:", err);
      setError("Failed to reserve room.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Please Enter Your Details</h2>
      {error && <p className="alert alert-danger text-center">{error}</p>}
      <form className="row g-3 mb-2" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-6">
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-4">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-4">
          <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-4">
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-6">
          <input type="date" name="checkin" value={formData.checkin} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-6">
          <input type="date" name="checkout" value={formData.checkout} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? "Reserving..." : "Reserve"}</button>
        </div>
      </form>
      <div className="col-12">
          <Link to='/'  className="btn btn-danger w-100" o>Change Room </Link>
        </div>
    </div>
  );
};

export default ReservationForm
;
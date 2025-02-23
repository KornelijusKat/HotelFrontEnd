const API_BASE_URL = "http://localhost:8000/api/v1"

const apiService = {
    getRooms: async () => {
      const response = await fetch(`${API_BASE_URL}/rooms`);
      return response.json();
    },
    getRoomById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/rooms/${id}`);
      return response.json();
    },
    createRoom: async (roomData) => {
      const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomData),
      });
      return response.json();
    },
    checkRoomAvailability: async (checkin, checkout) => {
      const response = await fetch(
        `${API_BASE_URL}/rooms/availability/checkin/${checkin}/checkout/${checkout}`
      );
      return response.json();
    },
    reserveRoom: async (roomId, reservationData) => {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });
      return response.json();
    },
    getUserReservations: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      return response.json();
    },
    cancelReservation: async (reservationId, userData) => {
      const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      return response.json();
    },
  };
  
  export default apiService;
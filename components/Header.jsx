import { Link } from "react-router-dom";
const Header = () => {
    return (
      <header className="bg-primary text-white py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h4 fw-bold">Hotel App</h1>
          <nav>
            <Link className="text-white mx-3 text-decoration-none fw-semibold" to="/">Discover Rooms</Link>
            <Link className="text-white mx-3 text-decoration-none fw-semibold" to="/reservations">Reservations</Link>
          </nav>
        </div>
      </header>
    );
};
  
export default Header;
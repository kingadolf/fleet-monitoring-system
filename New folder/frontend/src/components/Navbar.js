import { Link } from "react-router-dom";
import { Home, Wallet, Truck } from "lucide-react";

const Navbar = () => {
  return (
    <div className="sidebar">
      <h2>Fleet Management System</h2>

      <div className="menu">

        <Link to="/">
          <button className="nav-btn">
            <Home size={18} />
            <span>Home</span>
          </button>
        </Link>

        <Link to="/petty-cash">
          <button className="nav-btn">
            <Wallet size={18} />
            <span>Petty Cash</span>
          </button>
        </Link>

        <Link to="/trucks">
          <button className="nav-btn">
            <Truck size={18} />
            <span>Truck Info</span>
          </button>
        </Link>
        <div className="dev-tag">
          Created by Zaiy 2026
        </div>
      </div>
    </div>
  );
};

export default Navbar;
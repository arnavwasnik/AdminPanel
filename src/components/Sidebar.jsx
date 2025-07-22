// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/users">User Management</Link></li>
          <li><Link to="/orders">Orders Delivery</Link></li>
          <li><Link to="/payment">Payment Report</Link></li>
          <li><Link to="/promo">Promo Code</Link></li>
          <li><Link to="/restaurants">Restaurant Monitoring</Link></li>
        <li><Link to="/feedback">Feedback & Complaints</Link></li> {/* new added for testing */}


        </ul>
      </nav>
    </div>
  );
}

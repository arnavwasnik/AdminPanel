// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import UserManagement from './pages/UserManagement';
import Dashboard from './pages/Dashboard';
import OrdersDelivery from './pages/OrdersDelivery';
import PaymentReport from './pages/PaymentReport';
import PromoCode from './pages/PromoCode';
import RestaurantMonitoring from './pages/RestaurantMonitoring';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/orders" element={<OrdersDelivery />} />
            <Route path="/payment" element={<PaymentReport />} />
            <Route path="/promo" element={<PromoCode />} />
            <Route path="/restaurants" element={<RestaurantMonitoring />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

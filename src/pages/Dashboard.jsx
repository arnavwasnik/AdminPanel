import React, { useState } from "react";
import {
  FaShoppingCart, FaRupeeSign, FaUsers, FaMotorcycle, FaStar, FaMapMarkerAlt
} from "react-icons/fa";
import {
  PieChart, Pie, Cell, Legend, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "leaflet/dist/leaflet.css";

const deliveryData = [
  {
    id: 1,
    boyName: "Ravi Kumar",
    location: [28.6139, 77.2090],
    destination: [28.6137, 77.2092],
    orderId: "ORD10001"
  },
  {
    id: 2,
    boyName: "Suman Singh",
    location: [28.7041, 77.1025],
    destination: [28.7042, 77.1027],
    orderId: "ORD10002"
  },
  {
    id: 3,
    boyName: "Ajay Gupta",
    location: [28.5355, 77.3910],
    destination: [28.5350, 77.3920],
    orderId: "ORD10003"
  },
];

function isArrived(loc, dest) {
  const [lat1, lon1] = loc;
  const [lat2, lon2] = dest;
  return Math.abs(lat1 - lat2) < 0.001 && Math.abs(lon1 - lon2) < 0.001;
}

const kpis = [
  { label: "Total Orders", value: 1243, icon: <FaShoppingCart size={28} color="#22c55e" />, bg: "#e7f9f2" },
  { label: "Total Sales", value: "₹82,400", icon: <FaRupeeSign size={28} color="#1e90ff" />, bg: "#e6f0fa" },
  { label: "Active Users", value: 573, icon: <FaUsers size={28} color="#f59e42" />, bg: "#fff3e6" },
  { label: "Delivery Partners", value: 38, icon: <FaMotorcycle size={28} color="#a855f7" />, bg: "#f4e7fa" },
  { label: "Avg Rating", value: "4.5", icon: <FaStar size={28} color="#facc15" />, bg: "#fffbe8" },
];

const orderStatusData = [
  { name: "Delivered", value: 850 },
  { name: "Pending", value: 260 },
  { name: "Cancelled", value: 133 },
];
const orderStatusColors = ["#22c55e", "#fbbf24", "#ef4444"];

const ratingsData = [
  { name: "5 Stars", value: 320 }, { name: "4 Stars", value: 95 },
  { name: "3 Stars", value: 21 }, { name: "2 Stars", value: 7 }, { name: "1 Star", value: 3 },
];
const ratingsColors = ["#fde047", "#a3e635", "#38bdf8", "#fbbf24", "#f87171"];

const salesData = [
  { month: "Jan", sales: 6200 }, { month: "Feb", sales: 7250 }, { month: "Mar", sales: 8000 },
  { month: "Apr", sales: 6420 }, { month: "May", sales: 9300 }, { month: "Jun", sales: 8900 },
  { month: "Jul", sales: 10100 }, { month: "Aug", sales: 9700 }, { month: "Sep", sales: 10800 },
  { month: "Oct", sales: 11540 }, { month: "Nov", sales: 12200 }, { month: "Dec", sales: 12880 },
];

function formatDate(date) {
  return date ? date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
}

// Marker icons
const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});
const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const Dashboard = () => {
  const [period, setPeriod] = useState([new Date(2024, 0, 1), new Date(2024, 11, 31)]);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div style={{ padding: "0 10px" }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 24, flexWrap: "wrap", gap: 10
      }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>Dashboard</h2>
          <p style={{ color: "#8c8c8c", marginTop: 4 }}>Hi, Welcome to Admin!</p>
        </div>
        <div
          style={{
            background: "#fff", borderRadius: 16, boxShadow: "0 0 5px #eee",
            padding: "10px 20px", display: "flex", alignItems: "center", position: "relative"
          }}
        >
          <FaMapMarkerAlt size={20} color="#60A5FA" style={{ marginRight: 10 }} />
          <span style={{ color: "#888", marginRight: 10 }}>Filter Period</span>
          <span
            style={{
              marginLeft: 8, fontWeight: 500, color: "#213547", fontSize: 15,
              cursor: "pointer"
            }}
            onClick={() => setShowPicker(open => !open)}
          >
            {formatDate(period[0])} – {formatDate(period[1])}
          </span>
          {showPicker && (
            <div style={{
              position: "absolute", top: "115%", right: 0, background: "#fff",
              padding: 15, borderRadius: 10, boxShadow: "0 0 10px #8882", zIndex: 20,
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              <DatePicker
                selected={period[0]}
                onChange={date => setPeriod([date, period[1]])}
                selectsStart
                startDate={period[0]}
                endDate={period[1]}
                dateFormat="dd MMM yyyy"
                placeholderText="Start Date"
                maxDate={period[1]}
              />
              <span style={{ margin: "0 6px" }}>to</span>
              <DatePicker
                selected={period[1]}
                onChange={date => setPeriod([period[0], date])}
                selectsEnd
                startDate={period[0]}
                endDate={period[1]}
                minDate={period[0]}
                dateFormat="dd MMM yyyy"
                placeholderText="End Date"
              />
              <button onClick={() => setShowPicker(false)} style={{
                marginLeft: 10, background: "#60A5FA", color: "#fff",
                border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer"
              }}>OK</button>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <input
        type="search"
        placeholder="Search here"
        style={{
          width: "100%", borderRadius: 8, border: "1px solid #e5e7eb",
          padding: 12, fontSize: 16, marginBottom: 28, background: "#fff"
        }}
      />

      {/* KPI Cards */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 32,
        justifyContent: "space-between"
      }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={{
            flex: "1 1 160px", minWidth: 160, maxWidth: "calc(20% - 16px)",
            background: "#fff", borderRadius: 18, boxShadow: "0 2px 6px #f1f1f1",
            display: "flex", alignItems: "center", padding: "16px 22px", gap: 15
          }}>
            <div style={{
              background: kpi.bg, borderRadius: "50%", padding: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              minWidth: 48, minHeight: 48,
            }}>
              {kpi.icon}
            </div>
            <div>
              <div style={{ fontSize: 23, fontWeight: 700, color: "#222" }}>
                {kpi.value}
                {kpi.label === "Avg Rating" && (
                  <FaStar size={14} color="#facc15" style={{ marginLeft: 3, verticalAlign: "middle" }} />
                )}
              </div>
              <div style={{ color: "#8c8c8c", fontSize: 15 }}>{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pie Charts Row */}
      <div style={{
        display: "flex", gap: 24, marginBottom: 36, justifyContent: "space-between", flexWrap: "wrap"
      }}>
        {/* Orders by Status Pie Chart */}
        <div style={{
          background: "#fff", borderRadius: 20, boxShadow: "0 2px 6px #f1f1f1",
          padding: "26px 22px", flex: 1, minWidth: 315, maxWidth: 400, textAlign: "center"
        }}>
          <div style={{ fontWeight: 600, marginBottom: 18, fontSize: 17 }}>Orders by Status</div>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%" cy="50%"
                  outerRadius="80%"
                  label
                  paddingAngle={1}
                >
                  {orderStatusData.map((entry, idx) => (
                    <Cell key={idx} fill={orderStatusColors[idx % orderStatusColors.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ratings Distribution Pie Chart */}
        <div style={{
          background: "#fff", borderRadius: 20, boxShadow: "0 2px 6px #f1f1f1",
          padding: "26px 22px", flex: 1, minWidth: 315, maxWidth: 400, textAlign: "center"
        }}>
          <div style={{ fontWeight: 600, marginBottom: 18, fontSize: 17 }}>Ratings Distribution</div>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratingsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%" cy="50%"
                  outerRadius="80%"
                  label
                  paddingAngle={1}
                >
                  {ratingsColors.map((clr, idx) => (
                    <Cell key={idx} fill={clr} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Sales Line Chart */}
      <div style={{
        background: "#fff", borderRadius: 20, boxShadow: "0 2px 6px #f1f1f1",
        padding: "26px 22px", minHeight: 290, marginBottom: 36
      }}>
        <div style={{ fontWeight: 600, marginBottom: 18, fontSize: 17 }}>Monthly Sales (₹)</div>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#1e90ff" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Order Map - Only this section is updated per your request */}
      <div style={{
        background: "#fff", borderRadius: 20, boxShadow: "0 2px 6px #f1f1f1",
        padding: "26px 22px", minWidth: 260, maxWidth: 500, margin: "0 auto", textAlign: "center"
      }}>
        <div style={{ fontWeight: 600, marginBottom: 18, fontSize: 17 }}>Live Order Map</div>
        <MapContainer
          center={[28.6139, 77.209]}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: 240, width: "100%", borderRadius: 8 }}
        >
          <TileLayer
            attribution='© OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {deliveryData.map(d => (
            <React.Fragment key={d.id}>
              {/* Delivery Boy Marker */}
              <Marker
                position={d.location}
                icon={isArrived(d.location, d.destination) ? greenIcon : blueIcon}
              >
                <Popup>
                  <strong>{d.boyName}</strong><br />
                  Order: {d.orderId}<br />
                  Status: <b>{isArrived(d.location, d.destination) ? "Arrived" : "En Route"}</b>
                </Popup>
              </Marker>
              {/* Delivery Destination Marker */}
              <Marker
                position={d.destination}
                icon={redIcon}
              >
                <Popup>
                  Order Destination<br />
                  Order: {d.orderId}
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>
        <div style={{ color: "#94a3b8", fontSize: 15, marginTop: 10 }}>
          <b>Blue</b>: delivery partner<br />
          <b>Green</b>: arrived at order<br />
          <b>Red</b>: order address
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

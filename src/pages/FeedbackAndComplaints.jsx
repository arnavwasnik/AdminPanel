import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaReply, FaCheckCircle, FaBan, FaUndo } from "react-icons/fa";
import { AiFillShop } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const sampleReviews = [
  { id: 1, user: "Jane Doe", rating: 4, review: "Great service! Fast delivery.", date: "2025-07-21", adminResponse: "" },
  { id: 2, user: "Sam Smith", rating: 5, review: "Excellent work by the team.", date: "2025-07-19", adminResponse: "" },
  { id: 3, user: "Ava Lee", rating: 3, review: "Average experience, could improve packaging.", date: "2025-07-20", adminResponse: "" },
  { id: 4, user: "Rahul Patel", rating: 5, review: "Customer support was brilliant.", date: "2025-07-16", adminResponse: "Thank you for the feedback!" },
  { id: 5, user: "Emily White", rating: 2, review: "Delay in response.", date: "2025-07-13", adminResponse: "" },
  { id: 6, user: "Harish Kumar", rating: 4, review: "Easy refund process!", date: "2025-07-11", adminResponse: "" },
];

// Now every complaint has delivery boy info
const sampleComplaints = [
  { id: "C1023", user: "John", issue: "Food was cold on arrival", date: "2025-07-20", status: "Pending", deliveryBoyName: "Rohit Sharma", deliveryBoyId: "db101" },
  { id: "C1024", user: "Lisa", issue: "Payment charged twice", date: "2025-07-21", status: "Pending", deliveryBoyName: "Rajiv Sen", deliveryBoyId: "db102" },
  { id: "C1025", user: "Aditya", issue: "Promo code not working", date: "2025-07-18", status: "Resolved", deliveryBoyName: "Naresh Kumar", deliveryBoyId: "db103" },
  { id: "C1026", user: "Priya", issue: "Wrong order delivered", date: "2025-07-16", status: "Pending", deliveryBoyName: "Sandeep Yadav", deliveryBoyId: "db104" },
  { id: "C1027", user: "Michael", issue: "Restaurant packed wrong item", date: "2025-07-15", status: "Resolved", deliveryBoyName: "Sunil Kumar", deliveryBoyId: "db105" },
];

const StarRating = ({ rating }) => (
  <span>
    {[...Array(5)].map((_, i) =>
      i < rating ? (
        <FaStar key={i} color="#FFA500" size={16} style={{ marginRight: 1 }} />
      ) : (
        <FaRegStar key={i} color="#eee" size={16} style={{ marginRight: 1 }} />
      )
    )}
  </span>
);

export default function FeedbackAndComplaints() {
  const [reviews, setReviews] = useState(sampleReviews);
  const [complaints, setComplaints] = useState(sampleComplaints);
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const navigate = useNavigate();

  // Functions
  const handleReply = (reviewId) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, adminResponse: replyText } : r
      )
    );
    setReplyingId(null);
    setReplyText("");
  };
  const markResolved = (compId) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === compId ? { ...c, status: "Resolved" } : c
      )
    );
  };
  const handleRefund = (compId) => {
    alert(`Refund action triggered for complaint ${compId}`);
  };
  const handleBlock = (compId) => {
    alert(`Block action triggered for complaint ${compId}`);
  };
  const handleUndo = (compId) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === compId ? { ...c, status: "Pending" } : c
      )
    );
  };
  const gotoDeliveryBoy = (deliveryBoyId) => {
    // assumes your user management details are routed like `/users/:id`
    navigate(`/users/${deliveryBoyId}`);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07 }
    }),
  };

  return (
    <div
      style={{
        padding: "32px",
        maxWidth: 1240,
        margin: "0 auto 60px auto",
        background: "#f8f9fa",
        minHeight: "100vh"
      }}
    >

      {/* Ratings & Reviews Section */}
      <h2 style={{
        marginBottom: 25,
        paddingLeft: 10,
        fontWeight: 700,
        color: "#1a237e",
        fontSize: 26,
        letterSpacing: "0.5px"
      }}>
        Ratings & Reviews
      </h2>
      <motion.div
        className="reviews-grid"
        style={{
          display: "grid",
          gap: 26,
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          marginBottom: 44
        }}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {reviews.map((r, idx) => (
            <motion.div
              key={r.id}
              className="review-card"
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{
                background: "#fff",
                borderRadius: 15,
                boxShadow: "0 2px 14px rgba(33, 60, 168, 0.07), 0 1.5px 6px rgba(120,120,120,0.04)",
                padding: "22px 22px 14px 22px",
                minHeight: 185,
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 9
              }}>
                <div style={{
                  background: "#e3f2fd",
                  color: "#1976d2",
                  borderRadius: "50%",
                  width: 42,
                  height: 42,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 17,
                  marginRight: 15,
                }}>
                  {r.user
                    .split(" ")
                    .map((s, idx, a) => idx === 0 || idx === a.length - 1 ? s[0].toUpperCase() : "")
                    .join("")}
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{r.user}</div>
                  <div style={{ fontSize: 13, color: "#61708a" }}>{r.date}</div>
                </div>
                <span style={{ flexGrow: 1 }} />
                <StarRating rating={r.rating} />
              </div>
              <div style={{ fontSize: 16, color: "#232323", marginBottom: 10, fontWeight: 480, flex: "1 0 auto" }}>
                “{r.review}”
              </div>
              <div style={{ minHeight: 31 }}>
                {r.adminResponse ? (
                  <div style={{
                    background: "#e8f5e9",
                    color: "#2e7d32",
                    borderRadius: 6,
                    padding: "8px 12px",
                    fontSize: 15,
                    fontWeight: 480,
                    display: "flex",
                    alignItems: "center"
                  }}>
                    <FaReply style={{ marginRight: 8 }} />
                    {r.adminResponse}
                  </div>
                ) : replyingId === r.id ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      placeholder="Type response..."
                      style={{
                        padding: "6px 10px",
                        borderRadius: 5,
                        border: "1px solid #b2b2b2",
                        width: 180,
                        fontSize: 15
                      }}
                    />
                    <button
                      style={btnPrimary}
                      onClick={() => handleReply(r.id)}
                      disabled={!replyText}
                    >Send</button>
                    <button
                      style={btnText}
                      onClick={() => setReplyingId(null)}
                    >Cancel</button>
                  </div>
                ) : (
                  <button
                    style={{ ...btnOutlined, fontSize: 15, display: "flex", alignItems: "center" }}
                    onClick={() => { setReplyingId(r.id); setReplyText(""); }}>
                    <FaReply style={{ marginRight: 6 }} />
                    Reply
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Complaints Section */}
      <h2 style={{
        marginBottom: 17,
        paddingLeft: 10,
        fontWeight: 700,
        color: "#c75100",
        fontSize: 24,
        letterSpacing: "0.5px",
        display: "flex",
        alignItems: "center"
      }}>
        <AiFillShop style={{marginBottom: "-4px", marginRight: 5}} /> Complaints
      </h2>
      <motion.div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 22,
          marginBottom:35
        }}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {complaints.map((c, idx) => (
            <motion.div
              key={c.id}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="complaint-card"
              style={{
                background: "#fff",
                borderRadius: 14,
                minWidth: 320,
                minHeight: 140,
                boxShadow: "0 1px 8px rgba(33,60,168,0.09), 0 1.5px 6px rgba(120,120,120,0.06)",
                padding: "22px 26px 18px 26px",
                flex: "1 1 360px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                <AiFillShop color="#ff9900" size={23} style={{ marginRight: 9 }} />
                <div style={{ fontWeight: 500, fontSize: 17 }}>{c.user}</div>
                <span style={{ flexGrow: 1 }} />
                <span style={{
                  padding: "4px 14px",
                  borderRadius: "12px",
                  fontWeight: 500,
                  background: c.status === "Resolved" ? "#EAFAE7" : "#FFF5E5",
                  color: c.status === "Resolved" ? "#23bb33" : "#f28d0c",
                  fontSize: 14
                }}>
                  {c.status}
                </span>
              </div>
              <div style={{
                fontSize: 15,
                color: "#3a4659",
                marginBottom: 4,
              }}>
                <b>#{c.id}:</b> {c.issue}
              </div>
              <div style={{ fontSize: 13, color: "#8a97a2", marginBottom: 4 }}>{c.date}</div>
              {/* Delivery Boy info */}
              <div style={{ fontSize: 14, marginBottom: 8 }}>
                <span style={{ color: "#666" }}>Delivery Boy: </span>
                <span
                  style={{
                    color: "#1976d2",
                    fontWeight: 540,
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                  onClick={() => gotoDeliveryBoy(c.deliveryBoyId)}
                  title={`View ${c.deliveryBoyName}'s details`}
                >
                  {c.deliveryBoyName}
                </span>
              </div>
              {/* Actions */}
              <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
                <button
                  style={btnAction}
                  title="Refund"
                  onClick={() => handleRefund(c.id)}
                >
                  <FaUndo size={16} style={{ marginRight: 6 }} />
                  Refund
                </button>
                <button
                  style={btnActionBlock}
                  title="Block Partner"
                  onClick={() => handleBlock(c.id)}
                >
                  <FaBan size={16} style={{ marginRight: 6 }} />
                  Block
                </button>
                {c.status !== "Resolved" ? (
                  <button
                    style={btnActionDone}
                    title="Mark Resolved"
                    onClick={() => markResolved(c.id)}
                  >
                    <FaCheckCircle size={16} style={{ marginRight: 6 }} />
                    Resolved
                  </button>
                ) : (
                  <button
                    style={btnText}
                    title="Undo Resolved"
                    onClick={() => handleUndo(c.id)}
                  >
                    <FaUndo size={15} style={{ marginRight: 4 }} />
                    Undo
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// BUTTON STYLES
const btnPrimary = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "6px 13px",
  borderRadius: 6,
  marginLeft: 7,
  fontWeight: 500,
  cursor: "pointer",
  boxShadow: "0 1px 3px rgba(37,99,235,0.08)"
};
const btnOutlined = {
  background: "#fff",
  color: "#2563eb",
  border: "1.4px solid #b3cdf6",
  padding: "6px 14px",
  borderRadius: 7,
  cursor: "pointer",
  fontWeight: 500,
  boxShadow: "0 0.5px 1.5px #dbeafe56"
};
const btnText = {
  background: "none",
  color: "#7b8794",
  border: "none",
  marginLeft: 8,
  cursor: "pointer",
  fontSize: 16
};
const btnAction = {
  background: "#F4F9FE",
  color: "#1976D2",
  border: "1.2px solid #c8daf6",
  borderRadius: 6,
  fontWeight: 540,
  padding: "6px 14px",
  fontSize: 15,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  transition: "background 0.18s, border 0.18s"
};
const btnActionBlock = {
  ...btnAction,
  color: "#d90429",
  border: "1.2px solid #ffd3d3",
  background: "#fff6f6",
};
const btnActionDone = {
  ...btnAction,
  color: "#21bb54",
  border: "1.2px solid #aaf6bf",
  background: "#effff4",
};

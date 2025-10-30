import React, { useEffect, useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setLoggedInUser(user.name || "User");
    else window.location.href = "/login"; // protect route

    // Dummy static data
    setProducts([
       {
        id: 1,
        name: "Michael Holz",
        date: "04/10/2023",
        role: "Admin",
      },
      {
        id: 2,
        name: "Paula Wilson",
        date: "05/08/2023",
        role: "Publisher",
      },
      {
        id: 3,
        name: "Antonio Moreno",
        date: "11/05/2023",
        role: "Editor",
      },
      {
        id: 4,
        name: "Mary Saveloy",
        date: "06/09/2023",
        role: "Reviewer",
      },
      {
        id: 5,
        name: "Martin Sommer",
        date: "12/08/2023",
        role: "Moderator",
      },
    ]);
    
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {loggedInUser} 👋</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="table-wrapper">
        <h2 className="table-title">Product Overview</h2>

        <div className="table-list">
          {/* Table Header */}
          <div className="table-header">
            <span>#</span>
            <span>Product Name</span>
            <span>Price</span>
          </div>

          {/* Dynamic Rows */}
          {products.map((item, index) => (
            <ul key={index} className="table-row">
              <span>{index + 1}</span>
              <span>{item.name}</span>
              <span>{item.price}</span>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

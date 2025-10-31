import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", date: "", role: "", status: "" });
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  // Load logged user
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (!user) navigate("/login");
    setLoggedInUser(user);
  }, [navigate]);

  // Dummy static data
  useEffect(() => {
    setUsers([
      { name: "Michael Holz", date: "04/10/2023", role: "Admin", status: "Active" },
      { name: "Paula Wilson", date: "05/08/2023", role: "Publisher", status: "Active" },
      { name: "Antonio Moreno", date: "11/05/2023", role: "Reviewer", status: "Suspended" },
    ]);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // Form handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.date || !form.role || !form.status) {
      handleError("All fields are required!");
      return;
    }

    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = form;
      setUsers(updatedUsers);
      handleSuccess("User updated successfully!");
      setEditIndex(null);
    } else {
      setUsers([...users, form]);
      handleSuccess("User added successfully!");
    }

    setForm({ name: "", date: "", role: "", status: "" });
  };

  const handleEdit = (index) => {
    setForm(users[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    handleSuccess("User deleted successfully!");
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome, {loggedInUser} 👋</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <h2 className="table-title">User Management (CRUD)</h2>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit" className="add-btn">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      {/* CRUD Table */}
      <div className="table-wrapper">
        <div className="table-header">
          <span>#</span>
          <span>Name</span>
          <span>Date Created</span>
          <span>Role</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {users.map((user, index) => (
          <ul key={index} className="table-row">
            <span>{index + 1}</span>
            <span>{user.name}</span>
            <span>{user.date}</span>
            <span>{user.role}</span>
            <span
              className={`status ${user.status.toLowerCase()}`}
            >
              {user.status}
            </span>
            <span className="actions">
              <button onClick={() => handleEdit(index)} className="edit-btn">
                ✏️
              </button>
              <button onClick={() => handleDelete(index)} className="delete-btn">
                🗑️
              </button>
            </span>
          </ul>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;

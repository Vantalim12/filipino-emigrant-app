import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  addEmigrant,
  getEmigrants,
  updateEmigrant,
  deleteEmigrant,
} from "./services/emigrantsService";
import "./style.css";

function App() {
  const [emigrants, setEmigrants] = useState([]);
  const [formData, setFormData] = useState({
    year: "",
    single: "",
    married: "",
    widower: "",
    separated: "",
    divorced: "",
    notReported: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load emigrants data on component mount
  useEffect(() => {
    loadEmigrants();
  }, []);

  const loadEmigrants = async () => {
    try {
      setLoading(true);
      const data = await getEmigrants();
      setEmigrants(data);
    } catch (error) {
      console.error("Error loading emigrants:", error);
      alert("Error loading data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Convert string values to numbers
      const data = {
        year: parseInt(formData.year),
        single: parseInt(formData.single) || 0,
        married: parseInt(formData.married) || 0,
        widower: parseInt(formData.widower) || 0,
        separated: parseInt(formData.separated) || 0,
        divorced: parseInt(formData.divorced) || 0,
        notReported: parseInt(formData.notReported) || 0,
      };

      if (editingId) {
        await updateEmigrant(editingId, data);
        setEditingId(null);
      } else {
        await addEmigrant(data);
      }

      setFormData({
        year: "",
        single: "",
        married: "",
        widower: "",
        separated: "",
        divorced: "",
        notReported: "",
      });

      await loadEmigrants();
    } catch (error) {
      console.error("Error saving emigrant:", error);
      alert("Error saving data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (emigrant) => {
    setFormData({
      year: emigrant.year.toString(),
      single: emigrant.single.toString(),
      married: emigrant.married.toString(),
      widower: emigrant.widower.toString(),
      separated: emigrant.separated.toString(),
      divorced: emigrant.divorced.toString(),
      notReported: emigrant.notReported.toString(),
    });
    setEditingId(emigrant.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        setLoading(true);
        await deleteEmigrant(id);
        await loadEmigrants();
      } catch (error) {
        console.error("Error deleting emigrant:", error);
        alert("Error deleting data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      year: "",
      single: "",
      married: "",
      widower: "",
      separated: "",
      divorced: "",
      notReported: "",
    });
  };

  // Prepare data for chart
  const chartData = emigrants
    .map((emigrant) => ({
      year: emigrant.year,
      Single: emigrant.single,
      Married: emigrant.married,
      Widower: emigrant.widower,
      Separated: emigrant.separated,
      Divorced: emigrant.divorced,
      "Not Reported": emigrant.notReported,
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <div className="app">
      <div className="container">
        <h1>Filipino Emigrants Database</h1>

        {/* CRUD Form */}
        <div className="form-section">
          <h2>
            {editingId ? "Edit Emigrant Record" : "Add New Emigrant Record"}
          </h2>
          <form onSubmit={handleSubmit} className="emigrant-form">
            <div className="form-group">
              <label htmlFor="year">Year:</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                min="1900"
                max="2030"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="single">Single:</label>
                <input
                  type="number"
                  id="single"
                  name="single"
                  value={formData.single}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="married">Married:</label>
                <input
                  type="number"
                  id="married"
                  name="married"
                  value={formData.married}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="widower">Widower:</label>
                <input
                  type="number"
                  id="widower"
                  name="widower"
                  value={formData.widower}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="separated">Separated:</label>
                <input
                  type="number"
                  id="separated"
                  name="separated"
                  value={formData.separated}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="divorced">Divorced:</label>
                <input
                  type="number"
                  id="divorced"
                  name="divorced"
                  value={formData.divorced}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="notReported">Not Reported:</label>
                <input
                  type="number"
                  id="notReported"
                  name="notReported"
                  value={formData.notReported}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Record"
                  : "Add Record"}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} disabled={loading}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Data Table */}
        <div className="table-section">
          <h2>Emigrant Records</h2>
          {loading && <p>Loading...</p>}
          {emigrants.length === 0 && !loading ? (
            <p>No records found. Add some data to get started!</p>
          ) : (
            <div className="table-container">
              <table className="emigrants-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Single</th>
                    <th>Married</th>
                    <th>Widower</th>
                    <th>Separated</th>
                    <th>Divorced</th>
                    <th>Not Reported</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {emigrants.map((emigrant) => (
                    <tr key={emigrant.id}>
                      <td>{emigrant.year}</td>
                      <td>{emigrant.single}</td>
                      <td>{emigrant.married}</td>
                      <td>{emigrant.widower}</td>
                      <td>{emigrant.separated}</td>
                      <td>{emigrant.divorced}</td>
                      <td>{emigrant.notReported}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(emigrant)}
                          disabled={loading}
                          className="edit-btn"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(emigrant.id)}
                          disabled={loading}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Data Visualization */}
        {chartData.length > 0 && (
          <div className="chart-section">
            <h2>Filipino Emigrants by Marital Status</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Single" fill="#8884d8" />
                <Bar dataKey="Married" fill="#82ca9d" />
                <Bar dataKey="Widower" fill="#ffc658" />
                <Bar dataKey="Separated" fill="#ff7c7c" />
                <Bar dataKey="Divorced" fill="#8dd1e1" />
                <Bar dataKey="Not Reported" fill="#d084d0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

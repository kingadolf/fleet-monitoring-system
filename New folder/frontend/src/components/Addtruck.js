import { useState } from "react";

const AddTruckForm = ({ onClose, onAddSuccess }) => {
  const [truckId, setTruckId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("available");
  const [fuelLevel, setFuelLevel] = useState(100);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -------------------
    // VALIDATION FIRST
    // -------------------
    if (!truckId) {
      setMessage("Truck ID is required");
      setMessageType("error");
      return;
    }

    if (!name) {
      setMessage("Driver name is required");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch("/api/truck-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          truckId,
          name,
          status,
          fuelLevel
        })
      });

      const json = await response.json();

      if (response.ok) {
        setMessage("Truck added successfully!");
        setMessageType("success");

        // reset form
        setTruckId("");
        setName("");
        setStatus("available");
        setFuelLevel(100);

        // notify parent (refresh table + show toast)
        onAddSuccess("Truck added successfully!");

        // close modal AFTER success
        onClose();
      } else {
        setMessage(json.error || "Failed to add truck");
        setMessageType("error");
      }

    } catch (err) {
      console.error("Error:", err);
      setMessage("Server error");
      setMessageType("error");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>

      {/* MESSAGE UI */}
      {message && (
        <div className={`custom-alert ${messageType}`}>
          {message}
        </div>
      )}

      <h3>Add Truck Info</h3>

      <label>Truck ID:</label>
      <input
        type="text"
        value={truckId}
        onChange={(e) => setTruckId(e.target.value)}
      />

      <label>Driver Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Status:</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="available">Available</option>
        <option value="in_transit">In Transit</option>
        <option value="maintenance">Maintenance</option>
      </select>

      <label>Fuel Level:</label>
      <input
        type="number"
        min="0"
        max="100"
        value={fuelLevel}
        onChange={(e) => setFuelLevel(e.target.value)}
      />

      <button type="submit">Add Truck</button>
    </form>
  );
};

export default AddTruckForm;
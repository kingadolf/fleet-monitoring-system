import { useState, useEffect } from "react";

const EditTruckForm = ({ truck, onClose, onUpdated }) => {
  const [truckId, setTruckId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [fuelLevel, setFuelLevel] = useState(0);

  const [message, setMessage] = useState("");
  useEffect(() => {
    if (truck) {
      setTruckId(truck.truckId);
      setName(truck.name);
      setStatus(truck.status);
      setFuelLevel(truck.fuelLevel);
    }
  }, [truck]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // VALIDATION
    if (!truckId) {
      setMessage("Truck ID is required");
      return;
    }

    if (!name) {
      setMessage("Driver name is required");
      return;
    }

    try {
      const res = await fetch(`/api/truck-info/${truck._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          truckId,
          name,
          status,
          fuelLevel,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        onUpdated();
        onClose();
      } else {
        setMessage(data.error || "Failed to update truck");
      }

    } catch (err) {
      console.error(err);
      setMessage("Server error");

    }

  };

  return (
    <form className="create" onSubmit={handleUpdate}>
      <h3>Edit Truck</h3>
      {message && (
        <p style={{
          marginBottom: "10px",
          color: message.includes("success") ? "green" : "red"
        }}>
          {message}
        </p>
      )}

      <label>Truck ID:</label>
      <input
        value={truckId}
        onChange={(e) => setTruckId(e.target.value)}
      />
      <label>Driver Name:</label>
      <input
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

      <button type="submit">Update</button>
    </form>
  );
};
export default EditTruckForm;
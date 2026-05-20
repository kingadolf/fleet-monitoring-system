import { useState } from "react";

const AddCashForm = ({ onClose, onAddSuccess }) => {
  const [cashId, setCashId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [requestedBy, setRequestedBy] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -------------------
    // VALIDATION FIRST
    // -------------------
    if (!cashId) {
      setMessage("Cash ID is required");
      setMessageType("error");
      return;
    }

    if (!description) {
      setMessage("Description is required");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch("https://fleet-monitoring-system-backend.onrender.com/api/petty-cash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cashId,
          description,
          amount,
          requestedBy
        })
      });
          

      const json = await response.json();

      if (response.ok) {
        setMessage("Cash added successfully!");
        setMessageType("success");

        // reset form
        setCashId("");
        setDescription("");
        setAmount("");
        setRequestedBy("");

        // notify parent (refresh table + show toast)
        onAddSuccess("Cash added successfully!");

        // close modal AFTER success
        onClose();
      } else {
        setMessage(json.error || "Failed to add cash");
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

      <h3>Add Cash Info</h3>

      <label>Cash ID:</label>
      <input
        type="text"
        value={cashId}
        onChange={(e) => setCashId(e.target.value)}
      />

      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <label>Requested By:</label>
      <input
        type="text"
        value={requestedBy}
        onChange={(e) => setRequestedBy(e.target.value)}
      />

      <button type="submit">Add Cash</button>
    </form>
  );
};

export default AddCashForm;
import { useState, useEffect } from "react";

const EditCashForm = ({ cash, onClose, onUpdated }) => {
  const [cashId, setCashId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [requestedBy, setRequestedBy] = useState("");

  const [message, setMessage] = useState("");
  useEffect(() => {
    if (cash) {
      setCashId(cash.cashId);
      setDescription(cash.description);
      setAmount(cash.amount);
      setRequestedBy(cash.requestedBy);
    }
  }, [cash]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // VALIDATION
    if (!cashId) {
      setMessage("Cash ID is required");
      return;
    }

    if (!description) {
      setMessage("Description is required");
      return;
    }

    try {
      const res = await fetch(`/api/petty-cash/${cash._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cashId,
          description,
          amount,
          requestedBy
        }),
      });
         
      const data = await res.json();

      if (res.ok) {
        onUpdated();
        onClose();
      } else {
        setMessage(data.error || "Failed to update cash");
      }

    } catch (err) {
      console.error(err);
      setMessage("Server error");

    }

  };

  return (
    <form className="create" onSubmit={handleUpdate}>
      <h3>Edit Cash</h3>
      {message && (
        <p style={{
          marginBottom: "10px",
          color: message.includes("success") ? "green" : "red"
        }}>
          {message}
        </p>
      )}

      <label>Cash ID:</label>
      <input
        value={cashId}
        onChange={(e) => setCashId(e.target.value)}
      />
      <label>Description:</label>
      <input
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
        value={requestedBy}
        onChange={(e) => setRequestedBy(e.target.value)}
      />

      <button type="submit">Update</button>
    </form>
  );
};
export default EditCashForm;
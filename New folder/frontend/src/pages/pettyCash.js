import { useEffect, useState } from "react";
import AddCashForm from "../components/Addcash";
import EditCashForm from "../components/Editcash";

const PettyCash = () => {
  const [cashInfo, setCashInfo] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [editCash, setEditCash] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const API = "https://fleet-monitoring-system-backend.onrender.com";
  const fetchData = async () => {
    
    try {

      const response = await fetch(`${API}/api/petty-cash`);
      const json = await response.json();

      if (response.ok) {
        setCashInfo(json);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (cash) => {
    setEditCash(cash);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this cash entry?")) return;

    const res = await fetch(`${API}/api/petty-cash/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setCashInfo((prev) => prev.filter((c) => c._id !== id));

      // ✅ ADD SUCCESS MESSAGE (same style as Add/Edit)
      setAlertMessage("Cash entry deleted successfully!");

      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    } else {
      setAlertMessage("Failed to delete cash entry.");

      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  };


  const filteredCashInfo = cashInfo.filter((cash) => {
    const term = searchTerm.toLowerCase();

    return (
      cash.description?.toLowerCase().includes(term) ||
      cash.cashId?.toLowerCase().includes(term) ||
      cash.status?.toLowerCase().includes(term)
    );
  });
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="section">

      {/* HEADER */}
      <div className="section-header">
        <h2>Petty Cash Overview</h2>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search description, cash ID, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <button onClick={() => setShowForm(true)}>
            Add Cash Info
          </button>
        </div>
      </div>

      {/* ALERT */}
      {alertMessage && (
        <div className="floating-alert success">
          {alertMessage}
        </div>
      )}

      {/* ADD MODAL */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">

            <AddCashForm
              onClose={() => setShowForm(false)}
              onAddSuccess={(msg) => {
                fetchData();
                setAlertMessage(msg);

                setTimeout(() => {
                  setAlertMessage("");
                }, 3000);
              }}
            />

            <button className="close-btn" onClick={() => setShowForm(false)}>
              x
            </button>

          </div>
        </div>
      )}

      {/* EDIT MODAL (FIXED - OUTSIDE TABLE) */}
      {editCash && (
        <div className="modal-overlay">
          <div className="modal">

            <EditCashForm
              cash={editCash}
              onClose={() => setEditCash(null)}
              onUpdated={() => {
                fetchData();
                setAlertMessage("Cash entry updated successfully!");

                setTimeout(() => {
                  setAlertMessage("");
                }, 3000);

                setEditCash(null);
              }}
            />

            <button className="close-btn" onClick={() => setEditCash(null)}>
              x
            </button>

          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Cash ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Requested By</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCashInfo.length > 0 ? (
              filteredCashInfo.map((info) => (
                <tr key={info._id}>
                  <td>{info.cashId}</td>

                  <td>{info.description}</td>
                  <td>{formatCurrency(info.amount)}</td>
                  <td>{info.requestedBy}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(info)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(info._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No Petty Cash Info found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default PettyCash;
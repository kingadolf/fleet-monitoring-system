import { useEffect, useState } from "react";
import AddTruckForm from "../components/Addtruck";
import EditTruckForm from "../components/EditTruck";


const Truck = () => {
  const [truckInfo, setTruckInfo] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [editTruck, setEditTruck] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch("/api/truck-info");
      const json = await response.json();

      if (response.ok) {
        setTruckInfo(json);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (truck) => {
    setEditTruck(truck);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this truck?")) return;

    const res = await fetch(`/api/truck-info/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTruckInfo((prev) => prev.filter((t) => t._id !== id));

      // ✅ ADD SUCCESS MESSAGE (same style as Add/Edit)
      setAlertMessage("Truck deleted successfully!");

      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    } else {
      setAlertMessage("Failed to delete truck.");

      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  };

  const getStatusClass = (status) => {
    if (status === "available") return "available";
    if (status === "in_transit") return "transit";
    if (status === "maintenance") return "maintenance";
    return "";
  };
  const filteredTruckInfo = truckInfo.filter((truck) => {
    const term = searchTerm.toLowerCase();

    return (
      truck.name?.toLowerCase().includes(term) ||
      truck.truckId?.toLowerCase().includes(term) ||
      truck.status?.toLowerCase().includes(term)
    );
  });
  

  return (
    <div className="section">

      {/* HEADER */}
      <div className="section-header">
        <h2>Vehicle Tracking Overview</h2>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search driver, vehicle, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <button onClick={() => setShowForm(true)}>
            Add Truck Info
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

            <AddTruckForm
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
      {editTruck && (
        <div className="modal-overlay">
          <div className="modal">

            <EditTruckForm
              truck={editTruck}
              onClose={() => setEditTruck(null)}
              onUpdated={() => {
                fetchData();
                setAlertMessage("Truck updated successfully!");

                setTimeout(() => {
                  setAlertMessage("");
                }, 3000);

                setEditTruck(null);
              }}
            />

            <button className="close-btn" onClick={() => setEditTruck(null)}>
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
              <th>Plate Number</th>
              <th>Status</th>
              <th>Driver`s Name</th>
              <th>Fuel</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTruckInfo.length > 0 ? (
              filteredTruckInfo.map((info) => (
                <tr key={info._id}>
                  <td>{info.truckId}</td>
                  <td>
                    <span className={`status ${getStatusClass(info.status)}`}>
                      {info.status === "in_transit"
                        ? "In Transit"
                        : info.status === "maintenance"
                          ? "Maintenance"
                          : "Available"}
                    </span>
                  </td>
                  <td>{info.name}</td>
                  <td>{info.fuelLevel}%</td>

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
                  No truck found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Truck;
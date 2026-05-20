import { useEffect, useState } from "react";
import CashChart from "../components/cashChart";
import TruckCharts from "../components/TruckChart";
import { FileText, Wallet } from "lucide-react";
import { Truck, CheckCircle, RefreshCcw, Wrench } from "lucide-react";


const Home = () => {
  const [cashInfo, setCashInfo] = useState([]);
  const [truckInfo, setTruckInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const API = "https://fleet-monitoring-system-backend.onrender.com";
      try {
        const [cashRes, truckRes] = await Promise.all([
          fetch(`${API}/api/petty-cash`),
          fetch(`${API}/api/truck-info`),
        ]);

        const cashJson = await cashRes.json();
        const truckJson = await truckRes.json();
        console.log("CASH:", cashJson);
        console.log("TRUCK:", truckJson);

        if (cashRes.ok) setCashInfo(cashJson);
        if (truckRes.ok) setTruckInfo(truckJson);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);


  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // KPI TRcuks

  const totalTrucks = truckInfo.length;

  const availableTrucks = truckInfo.filter(
    (t) => t.status === "available"
  ).length;

  const inTransitTrucks = truckInfo.filter(
    (t) => t.status === "in_transit"
  ).length;

  const maintenanceTrucks = truckInfo.filter(
    (t) => t.status === "maintenance"
  ).length;

  const lowFuelTrucks = truckInfo.filter(
    (t) => Number(t.fuelLevel) <= 30
  ).length;

  // CASH KPIs
  const totalEntries = cashInfo.length;

  const totalAmount = cashInfo.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const averageExpense =
    totalEntries > 0 ? totalAmount / totalEntries : 0;

  const highestExpense = Math.max(
    ...cashInfo.map((i) => Number(i.amount || 0)),
    0
  );

  return (
    <div className="section">

      {/* ================= CASH SECTION ================= */}
      <div className="dashboard-section cash-section">
        <h2>💰 Cash Dashboard</h2>

        <CashChart cashInfo={cashInfo} />

        <div className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-icon blue">
              <FileText size={22} />
            </div>
            <div>
              <h3>Total Entries</h3>
              <p>{totalEntries}</p>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon green">
              <Wallet size={22} />
            </div>
            <div>
              <h3>Total Expenses</h3>
              <p>₱ {totalAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="kpi-card">
            <h3>Average Expense</h3>
            <p>₱ {averageExpense.toLocaleString()}</p>
          </div>

          <div className="kpi-card">
            <h3>Highest Expense</h3>
            <p>₱ {highestExpense.toLocaleString()}</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Cash ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Requested By</th>
              </tr>
            </thead>

            <tbody>
              {cashInfo.map((info) => (
                <tr key={info._id}>
                  <td>{info.cashId}</td>
                  <td>{info.description}</td>
                  <td>{formatCurrency(info.amount)}</td>
                  <td>{info.requestedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= FLEET SECTION ================= */}
      <div className="dashboard-section truck-section">
        <h2>🚛 Fleet Dashboard</h2>

        <div className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-icon gray">
              <Truck size={22} />
            </div>
            <div>
              <h3>Total Trucks</h3>
              <p>{totalTrucks}</p>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon green">
              <CheckCircle size={22} />
            </div>
            <div>
              <h3>Available</h3>
              <p>{availableTrucks}</p>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon blue">
              <RefreshCcw size={22} />
            </div>
            <div>
              <h3>In Transit</h3>
              <p>{inTransitTrucks}</p>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon red">
              <Wrench size={22} />
            </div>
            <div>
              <h3>Maintenance</h3>
              <p>{maintenanceTrucks}</p>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon red">
              <Wrench size={22} />
            </div>
            <div>
              <h3>Low Fuel Trucks</h3>
              <p>{lowFuelTrucks}</p>
            </div>
          </div>
        </div>

        <TruckCharts truckInfo={truckInfo} />
      </div>
      <div className="sidebar-footer">
        <p>Developed by</p>
        <h4>Zaiy 2026</h4>
      </div>
      <div className="watermark">
        Zaiy 2026
      </div>


    </div>


  );
};

export default Home;
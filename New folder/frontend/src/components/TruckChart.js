import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    LabelList
} from "recharts";

const TruckCharts = ({ truckInfo }) => {

    // =========================
    // STATUS DATA
    // =========================
    const statusData = {};

    truckInfo.forEach((truck) => {
        const status = truck.status || "unknown";
        statusData[status] = (statusData[status] || 0) + 1;
    });

    const statusChartData = Object.keys(statusData).map((key) => ({
        name: key,
        value: statusData[key],
    }));

    const COLORS = ["#1aac83", "#f97316", "#ef4444", "#2563eb"];

    // =========================
    // FUEL DATA
    // =========================
    const fuelData = truckInfo.map((truck) => ({
        name: truck.truckId,
        fuel: Number(truck.fuelLevel || 0),
    }));

    // =========================
    // LOW FUEL DATA
    // =========================
    const lowFuel = (truckInfo || [])
        .filter((t) => (t?.fuelLevel ?? 0) <= 30)
        .map((t) => ({
            name: t?.truckId ?? "Unknown",
            fuel: t?.fuelLevel ?? 0,
        }));

    const getFuelColor = (fuel) => {
        if (fuel <= 30) return "#ef4444";
        if (fuel <= 60) return "#f97316";
        return "#22c55e";
    };

    // =========================
    // GROUPED STATUS LIST
    // =========================
    const groupedTrucks = {
        available: [],
        in_transit: [],
        maintenance: [],
    };

    truckInfo.forEach((truck) => {
        const status = truck.status || "unknown";

        if (groupedTrucks[status]) {
            groupedTrucks[status].push(truck);
        }
    });

    const statusListData = [
        {
            title: "Available",
            color: "#22c55e",
            items: groupedTrucks.available,
        },
        {
            title: "In Transit",
            color: "#3b82f6",
            items: groupedTrucks.in_transit,
        },
        {
            title: "Maintenance",
            color: "#ef4444",
            items: groupedTrucks.maintenance,
        },
    ];

    return (
        <div>

            {/* ================= ROW 1 ================= */}
            <div className="chart-row">

                {/* PIE CHART */}
                <div className="chart-container">
                    <h3>Truck Status Overview</h3>

                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                            <Pie
                                data={statusChartData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={85}
                                label
                            >
                                {statusChartData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* FUEL CHART */}
                <div className="chart-container">
                    <h3>Fuel Levels</h3>

                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={fuelData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} />
                            <Tooltip />

                            <Bar dataKey="fuel" radius={[6, 6, 0, 0]}>
                                {fuelData.map((entry, index) => (
                                    <Cell key={index} fill={getFuelColor(entry.fuel)} />
                                ))}

                                <LabelList
                                    dataKey="fuel"
                                    position="top"
                                    formatter={(value) => `${value}%`}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* LOW FUEL */}
                <div className="chart-container">
                    <h3>Low Fuel (≤30%)</h3>

                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={lowFuel}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} />
                            <Tooltip />

                            <Bar dataKey="fuel" fill="#ef4444" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ================= ROW 2 ================= */}
            <div className="chart-container full-width">
                <h3>Truck Status List</h3>

                <div className="status-list-grid">

                    {statusListData.map((group, index) => (
                        <div key={index} className="status-box">

                            <h4 style={{ color: group.color }}>
                                {group.title} ({group.items.length})
                            </h4>

                            <table className="status-table">
                                <thead>
                                    <tr>
                                        <th>Plate No.</th>
                                        <th>Driver</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {group.items.length > 0 ? (
                                        group.items.map((truck) => (
                                            <tr key={truck._id}>
                                                <td>{truck.truckId}</td>
                                                <td>{truck.name}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="empty">
                                                No trucks
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default TruckCharts;
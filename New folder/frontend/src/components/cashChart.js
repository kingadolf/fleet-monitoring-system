import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const CashChart = ({ cashInfo }) => {

    // =========================
    // 1. CASH BY EMPLOYEE
    // =========================
    const groupedData = {};

    cashInfo.forEach((item) => {
        // console.log(item);
        const requester = item.requestedBy || "Unknown";

        groupedData[requester] =
            (groupedData[requester] || 0) + Number(item.amount || 0);
    });

    const employeeChartData = Object.keys(groupedData).map((key) => ({
        name: key,
        amount: groupedData[key],
    }));

    // =========================
    // 2. MONTHLY EXPENSES
    // =========================
    const monthlyData = {};
    cashInfo.forEach((item) => {

        if (!item.updatedAt) return;
        const date = new Date(item.updatedAt);

        const month = date.toLocaleString("defualt", {
            month: "short",
            year: "numeric"
        });
        monthlyData[month] = (monthlyData[month] || 0) + Number(item.amount || 0);
    });

    const monthlyChartData = Object.keys(monthlyData).map((key) => ({
        month: key,
        amount: monthlyData[key],
    }))
    // =========================
    // 2. Top EXPENSES
    // =========================

    const topExpenses = [...cashInfo]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5)
        .map((item) => ({
            name: item.description || "No Desc",
            value: Number(item.amount || 0), // ✅ FIX HERE
        }));
        
    const COLORS = ["#1aac83", "#2563eb", "#f97316", "#ef4444", "#7c3aed"];


    //   const monthlyData = {};

    //   cashInfo.forEach((item) => {
    //      console.log(item.timestamp)
    //     if (!item.timestamp) return;

    //     const date = new Date(item.timestamp);
    //     console.log(date);

    //     const month = date.toLocaleString("default", {
    //       month: "short",
    //       year: "numeric",
    //     });
    //     console.log(month);

    //     monthlyData[month] =
    //       (monthlyData[month] || 0) + Number(item.amount || 0);
    //   });
    //   console.log(monthlyData)

    //   const monthlyChartData = Object.keys(monthlyData).map((key) => ({
    //     month: key,
    //     amount: monthlyData[key],
    //   }));

    // If monthly data is not calculated, provide an empty array to avoid runtime errors
    // =========================
    // 2. Format Currency
    // =========================
    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="chart-row">

            {/* EMPLOYEE */}
            <div className="chart-card">
                <h3>By Employee</h3>

                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={employeeChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip formatter={(v) => formatCurrency(v)} />

                        <Bar dataKey="amount" fill="#1aac83" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* MONTHLY */}
            <div className="chart-card">
                <h3>Monthly</h3>

                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={monthlyChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip formatter={(v) => formatCurrency(v)} />

                        <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* PIE */}
            <div className="chart-card">
                <h3>Top Expenses</h3>

                <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                        <Pie
                            data={topExpenses}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={85}
                            label={({ name }) => name}
                        >
                            {topExpenses.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip formatter={(v, _, p) => [
                            formatCurrency(v),
                            p.payload.name,
                        ]} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );

};

export default CashChart;
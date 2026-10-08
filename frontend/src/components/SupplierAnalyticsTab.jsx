import { useEffect } from "react";
import { useSupplierStore } from "../stores/useSupplierStore";
import { DollarSign, Package, AlertCircle, TrendingUp } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const SupplierAnalyticsTab = () => {
	const { analytics, fetchSupplierAnalytics } = useSupplierStore();

	useEffect(() => {
		fetchSupplierAnalytics();
	}, [fetchSupplierAnalytics]);

	const data = analytics?.monthlySales || [
		{ month: "Jan", sales: 1200, orders: 45 },
		{ month: "Feb", sales: 2100, orders: 72 },
		{ month: "Mar", sales: 1800, orders: 58 },
		{ month: "Apr", sales: 3400, orders: 110 },
		{ month: "May", sales: 4200, orders: 140 },
		{ month: "Jun", sales: 5100, orders: 175 },
	];

	return (
		<div className="space-y-6">
			{/* Metric Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-md">
					<div className="flex justify-between items-center text-gray-400">
						<span className="text-xs font-bold uppercase tracking-wider">Total Products</span>
						<Package className="h-5 w-5 text-emerald-400" />
					</div>
					<div className="text-2xl font-bold text-white mt-2">{analytics?.totalProducts || 12}</div>
					<div className="text-xs text-emerald-400 mt-1">Active supplier listings</div>
				</div>

				<div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-md">
					<div className="flex justify-between items-center text-gray-400">
						<span className="text-xs font-bold uppercase tracking-wider">Inventory Value</span>
						<DollarSign className="h-5 w-5 text-emerald-400" />
					</div>
					<div className="text-2xl font-bold text-white mt-2">${(analytics?.totalInventoryValue || 17850).toLocaleString()}</div>
					<div className="text-xs text-emerald-400 mt-1">Total in-stock value</div>
				</div>

				<div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-md">
					<div className="flex justify-between items-center text-gray-400">
						<span className="text-xs font-bold uppercase tracking-wider">Low Stock Alerts</span>
						<AlertCircle className="h-5 w-5 text-amber-400" />
					</div>
					<div className="text-2xl font-bold text-amber-400 mt-2">{analytics?.lowStockCount || 2}</div>
					<div className="text-xs text-amber-400 mt-1">Items requiring restock</div>
				</div>

				<div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-md">
					<div className="flex justify-between items-center text-gray-400">
						<span className="text-xs font-bold uppercase tracking-wider">Growth Rate</span>
						<TrendingUp className="h-5 w-5 text-emerald-400" />
					</div>
					<div className="text-2xl font-bold text-white mt-2">+28.4%</div>
					<div className="text-xs text-emerald-400 mt-1">Compared to last month</div>
				</div>
			</div>

			{/* Chart */}
			<div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl space-y-4">
				<h3 className="text-lg font-bold text-emerald-400">Monthly Sales Revenue ($)</h3>
				<div className="h-72 w-full">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={data}>
							<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
							<XAxis dataKey="month" stroke="#9CA3AF" />
							<YAxis stroke="#9CA3AF" />
							<Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#FFF" }} />
							<Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default SupplierAnalyticsTab;


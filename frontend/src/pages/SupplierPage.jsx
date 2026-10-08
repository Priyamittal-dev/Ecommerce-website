import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { Package, BarChart2, AlertTriangle, Building } from "lucide-react";
import SupplierProductsTab from "../components/SupplierProductsTab";
import SupplierAnalyticsTab from "../components/SupplierAnalyticsTab";
import SupplierStockAlertsTab from "../components/SupplierStockAlertsTab";

const tabs = [
	{ id: "products", label: "Inventory / Products", icon: Package },
	{ id: "analytics", label: "Sales Analytics", icon: BarChart2 },
	{ id: "alerts", label: "Stock Alerts", icon: AlertTriangle },
];

const SupplierPage = () => {
	const [activeTab, setActiveTab] = useState("products");
	const { user } = useUserStore();

	return (
		<div className="min-h-screen bg-gray-900 text-white pt-6 pb-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto space-y-8">
				<div className="bg-gradient-to-r from-emerald-900/90 via-gray-800 to-gray-900 p-8 rounded-2xl border border-emerald-700/50 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
					<div>
						<div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm uppercase tracking-wider">
							<Building className="h-4 w-4" /> Supplier Partner Portal
						</div>
						<h1 className="text-3xl font-extrabold text-white mt-1">
							{user?.supplierCompany || `${user?.name}'s Enterprise Store`}
						</h1>
						<p className="text-gray-300 text-sm mt-1">
							Authorized Supplier ID: <span className="font-mono text-emerald-300">{user?._id?.slice(-8)}</span> | Status: <span className="text-emerald-400 font-semibold">Active Supplier</span>
						</p>
					</div>

					<div className="flex items-center gap-3">
						<span className="bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs px-3 py-1.5 rounded-full font-semibold">
							● Supplier Account Verified
						</span>
					</div>
				</div>

				<div className="flex border-b border-gray-700 space-x-4">
					{tabs.map((tab) => {
						const Icon = tab.icon;
						return (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center gap-2 pb-4 px-3 text-sm font-semibold border-b-2 transition-all ${
									activeTab === tab.id
										? "border-emerald-400 text-emerald-400"
										: "border-transparent text-gray-400 hover:text-gray-200"
								}`}
							>
								<Icon className="h-4 w-4" />
								{tab.label}
							</button>
						);
					})}
				</div>

				{activeTab === "products" && <SupplierProductsTab />}
				{activeTab === "analytics" && <SupplierAnalyticsTab />}
				{activeTab === "alerts" && <SupplierStockAlertsTab />}
			</div>
		</div>
	);
};

export default SupplierPage;

import { useEffect } from "react";
import { useSupplierStore } from "../stores/useSupplierStore";
import { AlertTriangle, RefreshCw } from "lucide-react";

const SupplierStockAlertsTab = () => {
	const { supplierProducts, fetchSupplierProducts, updateStock } = useSupplierStore();

	useEffect(() => {
		fetchSupplierProducts();
	}, [fetchSupplierProducts]);

	const lowStockItems = supplierProducts.filter((p) => (p.stock ?? 50) < 15);

	return (
		<div className="space-y-6">
			<div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
				<h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
					<AlertTriangle className="h-6 w-6" /> Inventory & Stock Alerts
				</h2>
				<p className="text-gray-400 text-sm mt-1">
					Products highlighted below are running low on stock (< 15 items remaining). Restock promptly to prevent out-of-stock cancellations.
				</p>
			</div>

			<div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl p-6">
				{lowStockItems.length === 0 ? (
					<div className="text-center py-10">
						<div className="text-emerald-400 text-lg font-bold">All Inventory Levels Healthy! ??</div>
						<p className="text-gray-400 text-sm mt-1">No products currently below low-stock threshold.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{lowStockItems.map((item) => (
							<div key={item._id} className="bg-gray-900 border border-amber-900/60 rounded-xl p-4 flex items-center justify-between">
								<div className="flex items-center gap-3">
									<img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover border border-amber-800" />
									<div>
										<h4 className="font-bold text-white text-sm">{item.name}</h4>
										<span className="text-xs text-amber-400 font-semibold bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
											Current Stock: {item.stock ?? 0} left
										</span>
									</div>
								</div>

								<button
									onClick={() => updateStock(item._id, (item.stock || 0) + 50)}
									className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3 py-2 rounded-lg font-semibold flex items-center gap-1 shadow"
								>
									<RefreshCw className="h-3.5 w-3.5" /> Restock +50
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default SupplierStockAlertsTab;


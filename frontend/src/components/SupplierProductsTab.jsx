import { useEffect, useState } from "react";
import { useSupplierStore } from "../stores/useSupplierStore";
import { PlusCircle, Package, AlertTriangle, Layers } from "lucide-react";
import { useCategoryStore } from "../stores/useCategoryStore";

const SupplierProductsTab = () => {
	const { supplierProducts, fetchSupplierProducts, createSupplierProduct, updateStock, loading } = useSupplierStore();
	const { fetchAllCategories, categories } = useCategoryStore();
	const [showAddModal, setShowAddModal] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		stock: 50,
		image: "",
	});

	useEffect(() => {
		fetchSupplierProducts();
		fetchAllCategories();
	}, [fetchSupplierProducts, fetchAllCategories]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setFormData({ ...formData, image: reader.result });
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await createSupplierProduct(formData);
		setShowAddModal(false);
		setFormData({ name: "", description: "", price: "", category: "", stock: 50, image: "" });
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
				<div>
					<h2 className="text-2xl font-bold text-emerald-400">Supplier Inventory Management</h2>
					<p className="text-gray-400 text-sm">Manage your product catalog, update stock levels, and list new items.</p>
				</div>
				<button
					onClick={() => setShowAddModal(true)}
					className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium flex items-center transition duration-200 shadow-md"
				>
					<PlusCircle className="mr-2 h-5 w-5" /> Add Supplier Product
				</button>
			</div>

			{/* Products Table */}
			<div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
				<table className="w-full text-left text-gray-300">
					<thead className="bg-gray-900/80 text-emerald-400 text-xs uppercase border-b border-gray-700">
						<tr>
							<th className="px-6 py-4">Product</th>
							<th className="px-6 py-4">Category</th>
							<th className="px-6 py-4">Price</th>
							<th className="px-6 py-4">Stock Level</th>
							<th className="px-6 py-4">Status</th>
							<th className="px-6 py-4">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-700/50">
						{supplierProducts.length === 0 ? (
							<tr>
								<td colSpan="6" className="text-center py-8 text-gray-400">
									No supplier products listed yet. Click "Add Supplier Product" above to list items.
								</td>
							</tr>
						) : (
							supplierProducts.map((product) => (
								<tr key={product._id} className="hover:bg-gray-750 transition-all">
									<td className="px-6 py-4 flex items-center gap-3">
										<img src={product.image} alt={product.name} className="h-10 w-10 rounded-lg object-cover border border-gray-700" />
										<div>
											<span className="font-semibold text-white block">{product.name}</span>
											<span className="text-xs text-gray-400 font-mono">ID: {product._id?.slice(-6)}</span>
										</div>
									</td>
									<td className="px-6 py-4">
										<span className="bg-gray-700 text-emerald-300 text-xs px-2.5 py-1 rounded-full border border-gray-600">
											{product.category}
										</span>
									</td>
									<td className="px-6 py-4 font-semibold text-emerald-400">${Number(product.price).toFixed(2)}</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<input
												type="number"
												min="0"
												value={product.stock ?? 50}
												onChange={(e) => updateStock(product._id, e.target.value)}
												className="w-20 bg-gray-900 border border-gray-600 rounded px-2 py-1 text-sm text-emerald-400 focus:outline-none focus:border-emerald-500"
											/>
											{(product.stock ?? 50) < 10 && (
												<span className="text-amber-400 text-xs flex items-center gap-1 font-medium bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
													<AlertTriangle className="h-3 w-3" /> Low Stock
												</span>
											)}
										</div>
									</td>
									<td className="px-6 py-4">
										<span className="bg-emerald-950/80 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-800 font-semibold">
											? Approved & Active
										</span>
									</td>
									<td className="px-6 py-4">
										<button
											onClick={() => updateStock(product._id, (product.stock || 0) + 25)}
											className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2.5 py-1 rounded border border-gray-600"
										>
											+ Restock (+25)
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Modal for Adding Supplier Product */}
			{showAddModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
					<div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
						<h3 className="text-xl font-bold text-emerald-400">List New Supplier Product</h3>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Product Title</label>
								<input
									type="text"
									required
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
									placeholder="e.g. Premium Silk Jacket"
								/>
							</div>
							<div>
								<label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Description</label>
								<textarea
									required
									rows="2"
									value={formData.description}
									onChange={(e) => setFormData({ ...formData, description: e.target.value })}
									className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
									placeholder="Describe your supplier product..."
								/>
							</div>
							<div className="grid grid-cols-3 gap-3">
								<div>
									<label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Price ($)</label>
									<input
										type="number"
										step="0.01"
										required
										value={formData.price}
										onChange={(e) => setFormData({ ...formData, price: e.target.value })}
										className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
										placeholder="99.99"
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Category</label>
									<input
										type="text"
										required
										value={formData.category}
										onChange={(e) => setFormData({ ...formData, category: e.target.value })}
										className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
										placeholder="e.g. jackets"
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Initial Stock</label>
									<input
										type="number"
										required
										value={formData.stock}
										onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
										className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
										placeholder="50"
									/>
								</div>
							</div>
							<div>
								<label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Product Image</label>
								<input
									type="file"
									accept="image/*"
									required
									onChange={handleImageChange}
									className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-700 file:text-white hover:file:bg-emerald-600"
								/>
							</div>

							<div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
								<button
									type="button"
									onClick={() => setShowAddModal(false)}
									className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={loading}
									className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-500 disabled:opacity-50"
								>
									{loading ? "Publishing..." : "Publish Product"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default SupplierProductsTab;


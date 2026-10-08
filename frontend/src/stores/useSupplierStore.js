import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useSupplierStore = create((set, get) => ({
	supplierProducts: [],
	analytics: null,
	loading: false,

	fetchSupplierProducts: async () => {
		set({ loading: true });
		try {
			const res = await axios.get("/supplier/products");
			set({ supplierProducts: Array.isArray(res.data) ? res.data : [], loading: false });
		} catch (error) {
			set({ supplierProducts: [], loading: false });
			console.error("Error fetching supplier products:", error);
		}
	},

	createSupplierProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/supplier/products", productData);
			set((state) => ({
				supplierProducts: [res.data, ...state.supplierProducts],
				loading: false,
			}));
			toast.success("Product listed successfully!");
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.message || "Failed to create product listing");
		}
	},

	fetchSupplierAnalytics: async () => {
		try {
			const res = await axios.get("/supplier/analytics");
			set({ analytics: res.data });
		} catch (error) {
			console.error("Error fetching supplier analytics:", error);
		}
	},

	updateStock: async (productId, newStock) => {
		try {
			const res = await axios.patch(`/supplier/products/${productId}/stock`, { stock: newStock });
			set((state) => ({
				supplierProducts: state.supplierProducts.map((p) =>
					p._id === productId ? { ...p, stock: res.data.stock } : p
				),
			}));
			toast.success("Stock updated successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to update stock");
		}
	},
}));


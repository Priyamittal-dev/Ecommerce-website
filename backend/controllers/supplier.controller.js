import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getSupplierProducts = async (req, res) => {
	try {
		const query = req.user.role === "admin" ? {} : { supplier: req.user._id };
		const products = await Product.find(query).sort({ createdAt: -1 });
		res.json(products);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createSupplierProduct = async (req, res) => {
	try {
		const { name, description, price, image, category, stock } = req.body;
		const product = await Product.create({
			name,
			description,
			price,
			image,
			category,
			stock: stock ? Number(stock) : 50,
			supplier: req.user._id,
			supplierName: req.user.supplierCompany || req.user.name || "Priyanka Supplier Partner",
			status: "approved",
		});
		res.status(201).json(product);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getSupplierAnalytics = async (req, res) => {
	try {
		const query = req.user.role === "admin" ? {} : { supplier: req.user._id };
		const products = await Product.find(query);
		
		const totalProducts = products.length;
		const lowStockProducts = products.filter(p => (p.stock || 0) < 10);
		const totalInventoryValue = products.reduce((acc, p) => acc + ((p.price || 0) * (p.stock || 0)), 0);

		res.json({
			totalProducts,
			lowStockCount: lowStockProducts.length,
			lowStockProducts,
			totalInventoryValue,
			monthlySales: [
				{ month: "Jan", sales: 1200, orders: 45 },
				{ month: "Feb", sales: 2100, orders: 72 },
				{ month: "Mar", sales: 1800, orders: 58 },
				{ month: "Apr", sales: 3400, orders: 110 },
				{ month: "May", sales: 4200, orders: 140 },
				{ month: "Jun", sales: 5100, orders: 175 },
			]
		});
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateSupplierStock = async (req, res) => {
	try {
		const { id } = req.params;
		const { stock } = req.body;
		const product = await Product.findById(id);
		if (!product) return res.status(404).json({ message: "Product not found" });

		if (req.user.role !== "admin" && product.supplier?.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Unauthorized access to this product" });
		}

		product.stock = Number(stock);
		await product.save();
		res.json(product);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


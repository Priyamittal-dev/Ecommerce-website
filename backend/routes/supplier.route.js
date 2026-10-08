import express from "express";
import { protectRoute, supplierRoute } from "../middleware/auth.middleware.js";
import {
	getSupplierProducts,
	createSupplierProduct,
	getSupplierAnalytics,
	updateSupplierStock,
} from "../controllers/supplier.controller.js";

const router = express.Router();

router.get("/products", protectRoute, supplierRoute, getSupplierProducts);
router.post("/products", protectRoute, supplierRoute, createSupplierProduct);
router.get("/analytics", protectRoute, supplierRoute, getSupplierAnalytics);
router.patch("/products/:id/stock", protectRoute, supplierRoute, updateSupplierStock);

export default router;


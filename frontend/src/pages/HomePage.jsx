import { useEffect, useState } from "react";
import CategoryItem from "../components/CategoryItem";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { useCategoryStore } from "../stores/useCategoryStore";
import { Sparkles, ShoppingBag, ShieldCheck, Truck, Clock, Search, Filter, Zap, Star } from "lucide-react";

const defaultCategories = [
	{ href: "/category/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/category/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/category/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/category/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/category/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/category/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/category/bags", name: "Bags", imageUrl: "/bags.jpg" },
	{ href: "/category/dress", name: "Dress", imageUrl: "/dress.webp" },
];

const fallbackProducts = [
	{
		_id: "prod_001",
		name: "Priyanka Luxe Leather Handbag",
		description: "Handcrafted genuine leather handbag with gold accents and multiple organizer compartments.",
		price: 189.99,
		image: "/bags.jpg",
		category: "Bags",
		supplierName: "Priyanka Fashion Labs",
		isFeatured: true,
	},
	{
		_id: "prod_002",
		name: "Classic Leather Denim Jacket",
		description: "Premium cotton-blend denim jacket designed for sleek streetwear comfort.",
		price: 129.99,
		image: "/jackets.jpg",
		category: "Jackets",
		supplierName: "Priyanka Apparel",
		isFeatured: true,
	},
	{
		_id: "prod_003",
		name: "Designer Aviator Sunglasses",
		description: "UV400 polarized aviators with anti-glare titanium ultra-lightweight frame.",
		price: 79.99,
		image: "/glasses.png",
		category: "Glasses",
		supplierName: "Priyanka Optical",
		isFeatured: true,
	},
	{
		_id: "prod_004",
		name: "Tailored Executive Suit",
		description: "Italian wool slim-fit 3-piece tuxedo suit engineered for modern executives.",
		price: 299.99,
		image: "/suits.jpg",
		category: "Suits",
		supplierName: "Priyanka Couture",
		isFeatured: true,
	},
	{
		_id: "prod_005",
		name: "Urban Leather Sneakers",
		description: "Minimalist white leather sneakers with ergonomic cushioned impact soles.",
		price: 149.99,
		image: "/shoes.jpg",
		category: "Shoes",
		supplierName: "Priyanka Footwear",
		isFeatured: true,
	},
	{
		_id: "prod_006",
		name: "Essential Cotton T-Shirt",
		description: "Organic combed cotton breathable crewneck tee with reinforced stitching.",
		price: 49.99,
		image: "/tshirts.jpg",
		category: "T-shirts",
		supplierName: "Priyanka Basics",
		isFeatured: true,
	},
	{
		_id: "prod_007",
		name: "Vintage Slim Fit Jeans",
		description: "Durable stretch denim jeans with classic 5-pocket tailoring.",
		price: 89.99,
		image: "/jeans.jpg",
		category: "Jeans",
		supplierName: "Priyanka Denim Co.",
		isFeatured: true,
	},
	{
		_id: "prod_008",
		name: "Elegance Floral Evening Dress",
		description: "Silk-feel flared evening dress designed for luxury formal occasions.",
		price: 199.99,
		image: "/dress.webp",
		category: "Dress",
		supplierName: "Priyanka Couture",
		isFeatured: true,
	},
];

const HomePage = () => {
	const { fetchFeaturedProducts, products } = useProductStore();
	const { fetchAllCategories, getCategoryFormatStrings } = useCategoryStore();
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		fetchFeaturedProducts();
		fetchAllCategories();
	}, [fetchFeaturedProducts, fetchAllCategories]);

	const categoryStrings = getCategoryFormatStrings();
	const categoriesToRender = categoryStrings && categoryStrings.length > 0 ? categoryStrings : defaultCategories;
	
	// Fast product merging with fallback guarantee
	const baseProducts = products && products.length > 0 ? products : fallbackProducts;

	// Instant reactive filtering
	const filteredProducts = baseProducts.filter((product) => {
		const matchesCategory =
			selectedCategory === "All" ||
			product.category?.toLowerCase() === selectedCategory.toLowerCase() ||
			(selectedCategory === "T-shirts" && (product.category?.toLowerCase() === "t-shirts" || product.category?.toLowerCase() === "tshirts"));
		
		const matchesSearch =
			!searchQuery ||
			product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.category?.toLowerCase().includes(searchQuery.toLowerCase());

		return matchesCategory && matchesSearch;
	});

	const categoryFilterPills = ["All", "Jeans", "T-shirts", "Shoes", "Glasses", "Jackets", "Suits", "Bags", "Dress"];

	return (
		<div className='relative min-h-screen text-white overflow-hidden bg-gray-900 pb-20'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-16'>
				
				{/* Hero Banner */}
				<div className='bg-gradient-to-r from-emerald-950 via-gray-900 to-emerald-900 p-8 sm:p-12 rounded-3xl border border-emerald-700/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8'>
					<div className='max-w-xl space-y-4 text-left z-10'>
						<span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'>
							<Sparkles className='h-3.5 w-3.5' /> Multi-Supplier Marketplace Live
						</span>
						<h1 className='text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight'>
							Welcome to <span className='text-emerald-400'>Priyanka's Store</span>
						</h1>
						<p className='text-gray-300 text-base sm:text-lg'>
							Discover premium curated apparel, accessories, and multi-supplier products with instant express shipping & secure Stripe checkout.
						</p>

						<div className='flex flex-wrap items-center gap-4 pt-2'>
							<a
								href='#fast-products-catalog'
								className='bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2'
							>
								<ShoppingBag className='h-5 w-5' /> Explore Instant Products
							</a>
						</div>
					</div>

					{/* Hero Feature Highlights */}
					<div className='grid grid-cols-2 gap-4 w-full md:w-auto z-10'>
						<div className='bg-gray-800/80 backdrop-blur p-4 rounded-xl border border-gray-700 text-center shadow-md'>
							<ShieldCheck className='h-6 w-6 text-emerald-400 mx-auto mb-1' />
							<h4 className='text-sm font-bold text-white'>100% Verified</h4>
							<p className='text-xs text-gray-400'>Supplier Quality</p>
						</div>
						<div className='bg-gray-800/80 backdrop-blur p-4 rounded-xl border border-gray-700 text-center shadow-md'>
							<Truck className='h-6 w-6 text-emerald-400 mx-auto mb-1' />
							<h4 className='text-sm font-bold text-white'>Express Delivery</h4>
							<p className='text-xs text-gray-400'>Free Shipping $50+</p>
						</div>
						<div className='bg-gray-800/80 backdrop-blur p-4 rounded-xl border border-gray-700 text-center shadow-md'>
							<Clock className='h-6 w-6 text-emerald-400 mx-auto mb-1' />
							<h4 className='text-sm font-bold text-white'>24/7 Support</h4>
							<p className='text-xs text-gray-400'>Customer Care</p>
						</div>
						<div className='bg-gray-800/80 backdrop-blur p-4 rounded-xl border border-gray-700 text-center shadow-md'>
							<Zap className='h-6 w-6 text-emerald-400 mx-auto mb-1' />
							<h4 className='text-sm font-bold text-white'>Instant Load</h4>
							<p className='text-xs text-gray-400'>Fast Products</p>
						</div>
					</div>
				</div>

				{/* Featured Products Carousel Slider */}
				<div className='space-y-4'>
					<FeaturedProducts featuredProducts={baseProducts} />
				</div>

				{/* Category Explorer Grid */}
				<div className='space-y-6'>
					<div className='text-center space-y-2'>
						<h2 className='text-3xl sm:text-4xl font-extrabold text-emerald-400'>
							Explore Categories
						</h2>
						<p className='text-gray-300 text-sm sm:text-base'>
							Browse high quality selections by category
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
						{categoriesToRender.map((category) => (
							<CategoryItem category={category} key={category.name} />
						))}
					</div>
				</div>

				{/* Fast Products Catalog Section */}
				<div id='fast-products-catalog' className='space-y-8 pt-8 border-t border-gray-800'>
					<div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-6'>
						<div>
							<span className='text-xs font-bold text-emerald-400 tracking-wider uppercase flex items-center gap-1.5 mb-1'>
								<Zap className='w-4 h-4 fill-emerald-400' /> Instant Product Catalog
							</span>
							<h2 className='text-3xl font-extrabold text-white'>All Available Products</h2>
							<p className='text-gray-400 text-sm mt-1'>Instant view of live inventory from verified suppliers</p>
						</div>

						{/* Real-time Search Box */}
						<div className='relative w-full md:w-72'>
							<Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
							<input
								type='text'
								placeholder='Search products fast...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-inner'
							/>
						</div>
					</div>

					{/* Fast Filter Pills */}
					<div className='flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none'>
						<span className='text-xs font-semibold text-gray-400 flex items-center gap-1 mr-1 flex-shrink-0'>
							<Filter className='w-3.5 h-3.5' /> Filter:
						</span>
						{categoryFilterPills.map((cat) => (
							<button
								key={cat}
								onClick={() => setSelectedCategory(cat)}
								className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
									selectedCategory === cat
										? "bg-emerald-600 text-white shadow-md shadow-emerald-950/60 border border-emerald-500"
										: "bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
								}`}
							>
								{cat}
							</button>
						))}
					</div>

					{/* Products Counter Bar */}
					<div className='flex items-center justify-between text-xs text-gray-400 bg-gray-800/40 px-4 py-2 rounded-lg border border-gray-800'>
						<span>Showing <strong className='text-emerald-400'>{filteredProducts.length}</strong> products</span>
						<span>Status: <strong className='text-emerald-400'>Ready for fast order</strong></span>
					</div>

					{/* Product Cards Grid */}
					{filteredProducts.length > 0 ? (
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
							{filteredProducts.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
						</div>
					) : (
						<div className='text-center py-16 bg-gray-800/30 rounded-2xl border border-gray-800 space-y-3'>
							<p className='text-lg font-semibold text-gray-300'>No products found matching your search</p>
							<button
								onClick={() => {
									setSelectedCategory("All");
									setSearchQuery("");
								}}
								className='text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg transition-colors'
							>
								Reset Filters
							</button>
						</div>
					)}
				</div>

			</div>
		</div>
	);
};

export default HomePage;

import { ShoppingCart, Star, Zap } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { addToCart } = useCartStore();

	const handleAddToCart = () => {
		addToCart(product);
	};

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/90 shadow-xl hover:shadow-emerald-950/40 hover:border-emerald-500/50 transition-all duration-300 group'>
			{/* Product Image & Badges */}
			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-gray-950/50'>
				<img 
					className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out' 
					src={product.image} 
					alt={product.name} 
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity' />
				
				{/* Top Badges */}
				<div className='absolute top-3 left-3 flex flex-col gap-1.5'>
					{product.isFeatured && (
						<span className='bg-emerald-500/90 text-gray-950 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-md shadow-md backdrop-blur-md flex items-center gap-1'>
							<Zap className='w-3 h-3 fill-current' /> Featured
						</span>
					)}
					<span className='bg-gray-900/80 text-gray-200 border border-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-md'>
						{product.category || "General"}
					</span>
				</div>

				{product.supplierName && (
					<div className='absolute bottom-3 left-3 right-3'>
						<span className='text-[11px] font-medium text-emerald-300 bg-gray-950/90 px-2.5 py-1 rounded-lg backdrop-blur-md border border-gray-800 inline-block shadow-md'>
							Supplier: {product.supplierName}
						</span>
					</div>
				)}
			</div>

			{/* Product Details */}
			<div className='p-5 flex flex-col flex-1 justify-between gap-4'>
				<div>
					<div className='flex items-center gap-1 text-amber-400 text-xs mb-1.5'>
						<Star className='w-3.5 h-3.5 fill-current' />
						<Star className='w-3.5 h-3.5 fill-current' />
						<Star className='w-3.5 h-3.5 fill-current' />
						<Star className='w-3.5 h-3.5 fill-current' />
						<Star className='w-3.5 h-3.5 fill-current text-gray-600' />
						<span className='text-gray-400 text-xs font-normal ml-1'>(4.8)</span>
					</div>

					<h5 className='text-lg font-bold tracking-tight text-white line-clamp-1 group-hover:text-emerald-400 transition-colors'>
						{product.name}
					</h5>
					
					<p className='text-xs text-gray-400 line-clamp-2 mt-1 min-h-[32px]'>
						{product.description || "High quality premium product with instant fast delivery."}
					</p>
				</div>

				<div className='pt-3 border-t border-gray-800/80 flex items-center justify-between gap-3'>
					<div>
						<span className='text-2xl font-black text-emerald-400'>${Number(product.price).toFixed(2)}</span>
					</div>

					<button
						className='flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold px-4 py-2.5 transition-all shadow-md shadow-emerald-950/50 gap-2'
						onClick={handleAddToCart}
					>
						<ShoppingCart className='w-4 h-4' />
						<span>Fast Add</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;

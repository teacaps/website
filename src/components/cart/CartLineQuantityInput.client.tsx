import { CartLineQuantity, CartLineQuantityAdjustButton } from "@shopify/hydrogen";

export function CartLineQuantityInput({ quantity }: { quantity: number }) {
	const buttonClasses =
		"flex h-8 items-center justify-center px-3 text-walnut-80 transition " +
		"hover:text-grain hover:bg-walnut " +
		"disabled:pointer-events-auto disabled:cursor-wait";
	return (
		<>
			<label className="sr-only">Quantity: {quantity}</label>
			<div className="flex items-center overflow-auto rounded-full border border-walnut">
				<CartLineQuantityAdjustButton
					adjust="decrease"
					aria-label="Decrease quantity"
					className={buttonClasses}>
					&#8722;
				</CartLineQuantityAdjustButton>
				<CartLineQuantity
					as="div"
					className="flex h-8 items-center justify-center px-3 text-center text-walnut"
				/>
				<CartLineQuantityAdjustButton
					adjust="increase"
					aria-label="Increase quantity"
					className={buttonClasses}>
					+
				</CartLineQuantityAdjustButton>
			</div>
		</>
	);
}

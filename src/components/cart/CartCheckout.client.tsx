import { Money, useCart } from "@shopify/hydrogen";

import { ButtonLink } from "../elements/input/Button";

export function CartCheckout() {
	const { checkoutUrl, cost } = useCart();
	return (
		<div className="flex flex-col space-y-8">
			<div className="flex w-full flex-col space-y-2">
				{cost?.subtotalAmount && (
					<span className="flex w-full items-center justify-between leading-7">
						<span className="text-walnut-80">Total</span>
						<Money
							data={cost.subtotalAmount}
							withoutTrailingZeros={true}
							className="font-medium text-walnut"></Money>
					</span>
				)}
				<span className="flex w-full items-center justify-between leading-7">
					<span className="text-walnut-80">Shipping & taxes</span>
					<span className="font-medium text-walnut">Calculated at checkout</span>
				</span>
			</div>
			<ButtonLink url={checkoutUrl!} className="w-full max-w-xl" color="matcha">
				Continue to Checkout
			</ButtonLink>
		</div>
	);
}

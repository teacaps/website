import { CartLineProvider, useCart } from "@shopify/hydrogen";
import { CartLineItem } from "./CartLineItem.client";
import { CartCheckout } from "./CartCheckout.client";

export function CartContents() {
	const { lines } = useCart();
	if (!lines.length) return <CartEmpty />;
	return (
		<form className="flex h-full flex-col justify-between">
			<section className="mx-12 overflow-auto border-t border-t-matcha-40 pb-4 pt-6">
				<ul className="grid gap-8 overflow-y-auto">
					{lines.map((line) => (
						<CartLineProvider key={line.id} line={line}>
							<CartLineItem />
						</CartLineProvider>
					))}
				</ul>
			</section>
			<section className="absolute bottom-0 w-full px-12 pb-8">
				<h2 className="sr-only">Cart summary</h2>
				<CartCheckout />
			</section>
		</form>
	);
}

function CartEmpty() {
	return (
		<div className="-mt-24 flex h-full flex-col items-center justify-center space-y-8 px-16">
			<h2 className="whitespace-pre-wrap font-medium text-matcha text-3xl">Nothing to see here</h2>
			<span className="font-medium text-walnut text-xl leading-none">{"Your cart's empty!"}</span>
		</div>
	);
}

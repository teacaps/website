import { useCartLine, CartLineImage, CartLinePrice, CartLineProductTitle, useCart } from "@shopify/hydrogen";
import clsx from "clsx";
import { BinIcon } from "../../assets/icons/bin";
import { CartLineQuantityInput } from "./CartLineQuantityInput.client";

export function CartLineItem() {
	const { linesRemove } = useCart();
	const {
		quantity,
		id,
		merchandise: { product, image, selectedOptions = [] },
	} = useCartLine();
	const optionsString = selectedOptions
		.filter((option) => option.name !== "Title")
		.map((option) => option.value)
		.join(" - ");
	return (
		<li className="flex flex-col space-y-4">
			<CartLineProductTitle as="h3" className="font-medium text-walnut text-lg leading-7" />
			<div className={clsx("flex space-x-6", !optionsString.length && "items-center")}>
				<CartLineImage
					alt={image?.altText || "An image of " + product.title}
					className="aspect-square h-24 w-24 rounded-2xl object-cover object-center"
				/>
				<div className="flex w-full flex-col space-y-2">
					{optionsString && <span className="text-walnut-80 leading-none">{optionsString}</span>}
					<div className="mb-2 flex">
						<CartLinePrice withoutTrailingZeros={true} as="span" className="font-medium text-walnut" />
					</div>
					<div className="mt-4 flex w-full justify-between">
						<CartLineQuantityInput quantity={quantity} />
						<button onClick={() => linesRemove([id])} className="ml-12">
							<BinIcon className="h-4 w-4 text-walnut hover:text-walnut-60" />
						</button>
					</div>
				</div>
			</div>
		</li>
	);
}

import { Image } from "@shopify/hydrogen";
import { ButtonLink } from "../elements/Button";
import type { ProductOverviewFragment } from "../../graphql/generated";

export function Featured({ product }: { product: ProductOverviewFragment }) {
	return (
		<div className="flex h-72 items-center justify-center space-x-16">
			<Image
				src={`/assets/illustrations/${product.handle}.png`}
				height="100%"
				width="20%"
				alt={`An illustration featuring ${product.title}.`}
				className="h-full w-auto"
			/>
			<div className="flex flex-col space-y-6 py-8">
				<h2 className="text-4xl font-normal leading-10">{product.title}</h2>
				<ButtonLink url={`products/${product.handle}`} color="matcha" className="text-xl">
					Shop now
				</ButtonLink>
			</div>
		</div>
	);
}

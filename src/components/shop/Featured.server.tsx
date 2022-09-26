import { Image } from "@shopify/hydrogen";

import { ButtonLink } from "../elements/input/Button";
import type { ProductOverviewFragment } from "../../graphql/storefront.generated";

export function Featured({ product }: { product: ProductOverviewFragment }) {
	return (
		<div className="flex h-auto w-full flex-col items-center justify-start space-y-2 md:h-72 md:w-unset md:flex-row md:justify-center xl:space-x-16">
			<a
				href={`products/${product.handle}`}
				className="flex h-auto w-full items-center justify-center md:h-full md:w-auto">
				<Image
					src={`/assets/illustrations/${product.handle}.png`}
					height="100%"
					width="20%"
					alt={`An illustration featuring ${product.title}.`}
					className="h-auto max-h-full w-auto"
				/>
			</a>
			<div className="flex min-w-fit flex-col items-center space-y-4 pb-4 md:items-start md:py-8">
				<h2 className="text-center font-normal text-walnut text-2xl leading-10 sm:text-4xl md:text-left xs:text-3xl">
					{product.title}
				</h2>
				<ButtonLink
					url={`products/${product.handle}`}
					color="matcha"
					className="h-10 px-3 text-base md:h-12 md:px-5 md:text-xl">
					Shop now
				</ButtonLink>
			</div>
		</div>
	);
}

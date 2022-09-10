import clsx from "clsx";
import { Image, ProductPrice } from "@shopify/hydrogen";
import type { ProductOverviewFragment } from "../../graphql/generated";

export function ProductCard({ product, hidden = false }: { product: ProductOverviewFragment; hidden?: boolean }) {
	const available = product.availableForSale;
	return (
		<div className={clsx("flex flex-col items-start justify-start space-y-4 px-6", hidden && "hidden")}>
			<div className="relative">
				<Image
					className="aspect-[5/4] w-auto rounded-3xl object-cover"
					width={500}
					data={product.featuredImage!}
					alt={product.featuredImage?.altText || `An image of ${product.title}`}
				/>
			</div>
			<div className="font-medium text-walnut-80 text-base leading-6">
				<span className="mb-2 text-walnut text-lg leading-none">{product.title}</span>
				{available ? <ProductPrice data={product} withoutTrailingZeros={true} /> : <div>Unavailable</div>}
			</div>
		</div>
	);
}

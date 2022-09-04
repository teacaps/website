import { Suspense } from "react";
import { Image, Money } from "@shopify/hydrogen";
import clsx from "clsx";
import type { ProductOverviewFragment, CollectionFragment } from "../../graphql/generated";

interface ProductGridProps {
	products: Array<ProductOverviewFragment>;
	filter: CollectionFragment["id"];
}

export function ProductGrid({ products, filter }: ProductGridProps) {
	return (
		<Suspense>
			<div className="grid w-5/6 grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3">
				{products.map((product) => (
					<ProductCard
						key={product.handle}
						product={product}
						hidden={filter === "all" ? false : !product.collections.nodes.some(({ id }) => id === filter)}
					/>
				))}
			</div>
		</Suspense>
	);
}

function ProductCard({ product, hidden }: { product: ProductOverviewFragment; hidden: boolean }) {
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
				{!available && (
					<span className="absolute bottom-0 left-0 flex rounded-r-full border-walnut bg-grain p-2 pl-0 text-xs leading-none text-walnut">
						out of stock
					</span>
				)}
			</div>
			<div className="text-base font-medium leading-6 text-walnut-80">
				<span className="mb-2 text-lg leading-none text-walnut">{product.title}</span>
				{available ? (
					<Money data={product.variants.edges[0].node.priceV2} withoutTrailingZeros={true} />
				) : (
					<div>Unavailable</div>
				)}
			</div>
		</div>
	);
}

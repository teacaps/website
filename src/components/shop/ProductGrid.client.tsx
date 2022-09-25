import { Suspense } from "react";
import type { CollectionFragment, ProductOverviewFragment } from "../../graphql/generated";
import { ProductCard } from "./ProductCard.client";

interface ProductGridProps {
	products: Array<ProductOverviewFragment>;
	filter: CollectionFragment["id"];
}

export function ProductGrid({ products, filter }: ProductGridProps) {
	return (
		<Suspense>
			<div className="grid w-full grid-cols-2 gap-x-0 gap-y-8 sm:gap-x-4 md:w-5/6 lg:grid-cols-3 lg:gap-x-0 xl:gap-x-4">
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

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

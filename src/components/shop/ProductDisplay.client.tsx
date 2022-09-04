import { useState } from "react";
import type { CollectionFragment, ProductOverviewFragment } from "../../graphql/generated";
import { Filter } from "./Filter.client";
import { ProductGrid } from "./ProductGrid.client";

interface ProductDisplayProps {
	products: Array<ProductOverviewFragment>;
	collections: Array<CollectionFragment>;
}
export function ProductDisplay({ collections, products }: ProductDisplayProps) {
	const [filter, setFilter] = useState("all");

	return (
		<div className="flex w-full items-start justify-center space-x-16">
			<Filter collections={collections} filter={filter} setFilter={setFilter} />
			{products?.length ? <ProductGrid products={products} filter={filter} /> : null}
		</div>
	);
}

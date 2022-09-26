import { useState } from "react";
import type { CollectionFragment, ProductOverviewFragment } from "../../graphql/storefront.generated";
import { Filter } from "./Filter.client";
import { ShopProductGrid } from "./ShopProductGrid.client";

interface ProductDisplayProps {
	products: Array<ProductOverviewFragment>;
	collections: Array<CollectionFragment>;
}
export function ShopProductDisplay({ collections, products }: ProductDisplayProps) {
	const [filter, setFilter] = useState("all");

	return (
		<div className="flex w-full flex-col items-center justify-center space-y-6 md:flex-row md:items-start md:space-y-0 md:space-x-10 xl:space-x-16">
			<Filter collections={collections} filter={filter} setFilter={setFilter} />
			{products?.length ? <ShopProductGrid products={products} filter={filter} /> : null}
		</div>
	);
}

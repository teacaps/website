import type { CollectionFragment } from "../../graphql/storefront.generated";
import { CollectionProductCard } from "./ProductCard.client";

export function ShopTheCollection({ collection }: { collection: CollectionFragment }) {
	return (
		<section className="flex w-full flex-col items-center justify-center space-y-8 pb-0 lg:flex-row lg:space-y-0 lg:space-x-16 xl:space-x-24 xs:pt-8">
			<h2 className="text-matcha text-xl leading-10 xl:text-3xl xs:text-2xl">Shop the Collection</h2>
			<div className="grid grid-cols-2 items-start justify-start gap-y-8 gap-x-0 last:pr-0 sm:grid-cols-3 2xl:gap-x-12">
				{collection.products.nodes.map((product) => (
					<CollectionProductCard key={product.handle} product={product} />
				))}
			</div>
		</section>
	);
}

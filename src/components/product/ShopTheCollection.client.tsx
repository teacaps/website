import { CollectionProductCard } from "./ProductCard.client";
import type { CollectionFragment } from "../../graphql/storefront.generated";

export function HorizontalShopTheCollection({ collection }: { collection: CollectionFragment }) {
	return (
		<section className="mt-16 flex w-full flex-col items-center justify-center space-y-8 lg:mt-24 lg:flex-row lg:space-y-0 lg:space-x-12 xl:space-x-24">
			<h2 className="text-matcha text-xl leading-10 xs:text-2xl xl:text-3xl">Shop the Collection</h2>
			<div className="flex flex-wrap items-start justify-center gap-y-8 last:pr-0">
				{collection.products.nodes.map((product) => (
					<CollectionProductCard key={product.handle} product={product} />
				))}
			</div>
		</section>
	);
}

export function VerticalShopTheCollection({ collection }: { collection: CollectionFragment }) {
	return (
		<section className="mt-16 flex flex-col items-center justify-center space-y-8 lg:mt-24">
			<h2 className="text-matcha text-xl leading-10 xs:text-2xl xl:text-3xl">Shop the Collection</h2>
			<div className="flex flex-col items-center justify-start gap-y-8">
				{collection.products.nodes.map((product) => (
					<CollectionProductCard key={product.handle} product={product} className="md:w-3/4 lg:w-3/5" />
				))}
			</div>
		</section>
	);
}

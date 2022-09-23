import type { CollectionFragment } from "../../graphql/generated";
import { ProductCard } from "../shop/ProductCard.client";

export function ShopTheCollection({ collection }: { collection: CollectionFragment }) {
	return (
		<section className="mb-8 flex w-full items-center justify-center space-x-24 py-8">
			<h2 className="text-matcha text-3xl leading-10">Shop the Collection</h2>
			<div className="grid grid-cols-3 items-start justify-start gap-x-12">
				{collection.products.nodes.map((product) => (
					<ProductCard key={product.handle} product={product} />
				))}
			</div>
		</section>
	);
}

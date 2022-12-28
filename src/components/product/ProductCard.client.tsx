import { Image, Link, ProductPrice } from "@shopify/hydrogen";
import clsx from "clsx";

import type { ProductOverviewFragment } from "../../graphql/storefront.generated";

export function ProductCard({ product, hidden = false }: { product: ProductOverviewFragment; hidden?: boolean }) {
	const available = product.availableForSale;
	return (
		<Link
			className={clsx("flex flex-col items-start justify-start space-y-4 px-4 sm:px-6", hidden && "hidden")}
			to={`/products/${product.handle}`}>
			<Image
				className="aspect-[5/4] h-auto rounded-2xl object-cover xs:rounded-3xl"
				width={500}
				data={product.featuredImage!}
				alt={product.featuredImage?.altText || `An image of ${product.title}`}
			/>
			<div className="font-medium text-walnut-80 text-sm leading-6 sm:text-base">
				<span className="mb-2 text-walnut text-base leading-none sm:text-lg">{product.title}</span>
				{available ? <ProductPrice data={product} withoutTrailingZeros={true} /> : <div>Unavailable</div>}
			</div>
		</Link>
	);
}

export function CollectionProductCard({
	product,
	hidden = false,
	className = "",
}: {
	product: ProductOverviewFragment;
	hidden?: boolean;
	className?: string;
}) {
	const available = product.availableForSale;
	return (
		<Link
			className={clsx(
				"flex w-full flex-col items-start justify-center space-y-4 px-4 xs:w-1/2 xs:min-w-[160px] sm:justify-start lg:px-8",
				hidden && "hidden",
				className,
			)}
			to={`/products/${product.handle}`}>
			<Image
				className="aspect-[5/4] h-auto w-auto rounded-2xl object-cover xs:rounded-3xl"
				width={500}
				data={product.featuredImage!}
				alt={product.featuredImage?.altText || `An image of ${product.title}`}
			/>
			<div className="font-medium text-walnut-80 text-sm leading-6 sm:text-base">
				<span className="mb-2 text-walnut leading-none">{product.title}</span>
				{available ? <ProductPrice data={product} withoutTrailingZeros={true} /> : <div>Unavailable</div>}
			</div>
		</Link>
	);
}

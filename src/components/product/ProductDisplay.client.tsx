import { ProductOptionsProvider } from "@shopify/hydrogen";
import { useRef } from "react";

import { Container } from "../global/Container";
import { ProductGallery } from "./ProductGallery.client";
import { ProductInfo } from "./ProductInfo.client";
import { HorizontalShopTheCollection, VerticalShopTheCollection } from "./ShopTheCollection.client";
import { Timeline } from "./Timeline";
import type { ProductDetailsFragment } from "../../graphql/storefront.generated";
import type ImageGallery from "react-image-gallery";

export function ProductDisplay({ product }: { product: ProductDetailsFragment }) {
	const colorwayCollection = product.collections.nodes.find((collection) => collection.isColorway?.value === "true");
	if (colorwayCollection?.products?.nodes)
		colorwayCollection.products.nodes = colorwayCollection.products.nodes.filter((p) => p.id !== product.id);
	const galleryRef = useRef<ImageGallery>(null);
	const showCollection = (colorwayCollection?.products.nodes.length || 0) > 0 || null;
	return (
		<ProductOptionsProvider data={product}>
			<Container className="mt-8">
				<section className="mb-16 flex w-full flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-6 lg:space-x-12">
					<section className="h-full w-full basis-1/2 md:top-0 md:-mt-16 md:w-1/2">
						<ProductGallery media={product.media.nodes} galleryRef={galleryRef} />
						<div className="hidden w-full md:block">
							{showCollection && <VerticalShopTheCollection collection={colorwayCollection as never} />}
						</div>
					</section>
					<ProductInfo product={product} gallery={galleryRef} />
				</section>
				{product.preorder?.value === "true" ? <Timeline status={product.status?.value} /> : null}
				<div className="md:hidden">
					{showCollection && <HorizontalShopTheCollection collection={colorwayCollection as never} />}
				</div>
			</Container>
		</ProductOptionsProvider>
	);
}

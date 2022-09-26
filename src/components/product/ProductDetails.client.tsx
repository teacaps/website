import type ImageGallery from "react-image-gallery";
import { ProductOptionsProvider } from "@shopify/hydrogen";
import { useRef } from "react";
import type { ProductDetailsFragment } from "../../graphql/storefront.generated";
import { Container } from "../elements/Container";
import { ProductGallery } from "./ProductGallery.client";
import { ProductInfo } from "./ProductInfo.client";
import { ShopTheCollection } from "./ShopTheCollection.client";
import { Timeline } from "./Timeline";

export function ProductDetails({ product }: { product: ProductDetailsFragment }) {
	const colorwayCollection = product.collections.nodes.find((collection) => collection.isColorway?.value === "true");
	const galleryRef = useRef<ImageGallery>(null);
	return (
		<ProductOptionsProvider data={product}>
			<Container className="mt-8 mb-16">
				<section className="mb-16 flex w-full flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-6 lg:space-x-12">
					<ProductGallery media={product.media.nodes} galleryRef={galleryRef} />
					<ProductInfo product={product} gallery={galleryRef} />
				</section>
				<div className="mt-16 mb-8 w-full sm:mb-16">
					<Timeline status={product.status?.value} />
				</div>
				{colorwayCollection ? <ShopTheCollection collection={colorwayCollection as never} /> : null}
			</Container>
		</ProductOptionsProvider>
	);
}

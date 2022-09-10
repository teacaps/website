import type ImageGallery from "react-image-gallery";
import { ProductOptionsProvider } from "@shopify/hydrogen";
import { useRef } from "react";
import type { ProductDetailsFragment } from "../../graphql/generated";
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
				<section className="mb-16 flex w-full space-x-12">
					<ProductGallery media={product.media.nodes} galleryRef={galleryRef} />
					<ProductInfo product={product} gallery={galleryRef} />
				</section>
				<div className="my-16 w-full">
					<Timeline status={product.status?.value} />
				</div>
				{colorwayCollection ? <ShopTheCollection collection={colorwayCollection as never} /> : null}
			</Container>
		</ProductOptionsProvider>
	);
}

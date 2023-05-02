import { AddToCartButton, Money, ProductPrice, useCart, useProductOptions } from "@shopify/hydrogen";
import clsx from "clsx";
import { useEffect, useState } from "react";

import { AirplaneIcon } from "../../assets/icons/airplane";
import { ClockIcon } from "../../assets/icons/clock";
import { SocialLinks } from "../elements/SocialLinks";
import { Button } from "../elements/input/Button";
import { ProductSubscribeForm } from "../elements/input/SubscribeForm.client";
import type { ProductDetailsFragment } from "../../graphql/storefront.generated";
import type { RefObject } from "react";
import type ImageGallery from "react-image-gallery";

interface ProductInfoProps {
	product: ProductDetailsFragment;
	gallery: RefObject<ImageGallery>;
}

export function ProductInfo({ product, gallery }: ProductInfoProps) {
	return (
		<div className="flex basis-1/2 flex-col space-y-16">
			<ProductDescription product={product} gallery={gallery} />
			<ProductMisc product={product} />
		</div>
	);
}

function ProductDescription({ product, gallery }: ProductInfoProps) {
	const { selectedVariant } = useProductOptions();
	const variantAvailable = selectedVariant?.availableForSale;

	const currencyCode =
		(variantAvailable && selectedVariant?.price?.currencyCode) ||
		product.priceRange?.minVariantPrice?.currencyCode ||
		product.priceRange?.maxVariantPrice?.currencyCode;

	const compareAtPrice = Number(selectedVariant?.compareAtPrice?.amount);
	const regularPrice = Number(selectedVariant?.price?.amount);
	const isOnSale = (compareAtPrice && compareAtPrice !== regularPrice) || null;

	return (
		<div className="flex flex-col space-y-8">
			<h1 className="text-matcha text-3xl leading-10 md:text-4xl">{product.title}</h1>
			{product.summary?.value ? <p className="prose text-walnut leading-7">{product.summary?.value}</p> : null}
			<div className="flex flex-col items-start space-y-6 text-matcha text-xl leading-8 lg:text-2xl">
				<VariantSelector gallery={gallery} />
				<div className="flex items-center space-x-2">
					<span className="flex">
						{currencyCode}
						&nbsp;
						<ProductPrice
							as="span"
							data={product}
							withoutTrailingZeros={true}
							variantId={variantAvailable ? selectedVariant?.id : undefined}
						/>
					</span>
					{isOnSale ? (
						<span className="flex text-walnut-80 line-through text-lg">
							<Money
								as="span"
								data={selectedVariant?.compareAtPrice || product.compareAtPriceRange.maxVariantPrice}
								withoutTrailingZeros={true}
							/>
						</span>
					) : null}
				</div>
				<AddToCart />
			</div>
		</div>
	);
}

function ProductMisc({ product }: { product: ProductDetailsFragment }) {
	const detailsLines = String(product.detailsHtml)
		.split("\n")
		.filter((line) => !line.includes("meta charset"));
	const detailsListItems = detailsLines.reduce<Array<[string | undefined, string]>>((acc, line) => {
		const withoutTags = line.replace(/<[^>]*>?/g, "");
		if (!withoutTags.length) return acc;
		const [key, value] = withoutTags.split(":");
		// eslint-disable-next-line no-sparse-arrays
		if (withoutTags === line || !value) acc.push([, line.trim()]);
		else acc.push([key.trim(), value.trim()]);
		return acc;
	}, []);

	const isInStock = product.preorder?.value === "false";
	const availability = isInStock ? "in stock" : product.groupBuyDates?.value || "in stock";

	return (
		<div className="flex flex-col space-y-8 text-walnut">
			<div className="flex flex-col">
				<div className="mb-8 flex flex-col space-y-8 text-lg lg:flex-row lg:items-center lg:space-y-0 lg:space-x-16">
					<div className="flex items-center space-x-4">
						<ClockIcon className="h-6 w-6 text-walnut-80" />
						<span className="trim-both leading-none">Available {availability}</span>
					</div>
					{!isInStock && product.estimatedDelivery?.value ? (
						<div className="flex items-center space-x-4">
							<AirplaneIcon className="h-6 w-6 text-walnut-80" />
							<span className="trim-both leading-none">Ships {product.estimatedDelivery.value}</span>
						</div>
					) : null}
				</div>
				<ul className="prose mb-8 flex flex-col gap-2">
					{detailsListItems.map(([key, value]) => (
						<li key={key || value} className="flex space-x-8 text-base leading-6">
							<span
								className={clsx("font-regular", !!key && "text-walnut-80")}
								dangerouslySetInnerHTML={{ __html: key || value || "" }}></span>
							{key && (
								<span className="font-medium" dangerouslySetInnerHTML={{ __html: value || "" }}></span>
							)}
						</li>
					))}
				</ul>
				<p className="text-walnut-80 text-sm leading-5">
					{!isInStock
						? "This product is a pre-order item. " +
						  "Order cancellations are not available after the pre-order has been closed. " +
						  "If your shipping address has changed, please contact us at least three weeks before delivery."
						: "This product is in-stock. " +
						  "If combined with pre-order products in a single order, we'll ship your order when all products have arrived."}
				</p>
			</div>
			<ProductUpdates />
		</div>
	);
}

function ProductUpdates() {
	return (
		<div className="flex flex-col space-y-4 md:space-y-6">
			<p className="text-walnut leading-7">
				To keep up with production and shipping, sign up for email updates or join our community on social
				media!
			</p>
			<ProductSubscribeForm className="w-full" />
			<SocialLinks iconClasses="mt-2 md:mt-0 h-6 w-6 text-walnut hover:text-matcha" />
		</div>
	);
}

function VariantSelector({ gallery }: { gallery: RefObject<ImageGallery> }) {
	const { variants, selectedVariant, setSelectedVariant } = useProductOptions();
	if (!variants || variants.length === 1) return null;
	return (
		<div className="flex space-x-4">
			{variants.map((variant) => {
				const isSelected = selectedVariant?.id === variant?.id;
				const isAvailable = variant?.availableForSale;
				if (!variant) return null;
				return (
					<Button
						key={variant.id}
						color="walnut"
						disabled={!isAvailable}
						className={clsx(
							"h-10 px-4 text-sm",
							isSelected && (isAvailable ? "bg-walnut text-grain" : "bg-grain text-walnut-60"),
						)}
						onClick={() => {
							setSelectedVariant(variant as never);
							// I can't believe this works
							const variantImgTag = document.querySelector(
								`img.image-gallery-thumbnail-image[src="${variant.image?.url}"]`,
							);
							if (variantImgTag) {
								const slideIndex = variantImgTag
									?.closest("button.image-gallery-thumbnail")
									?.ariaLabel?.match(/\d+/)?.[0];
								if (slideIndex) gallery.current?.slideToIndex(parseInt(slideIndex) - 1);
							}
						}}>
						{variant.title}
					</Button>
				);
			})}
		</div>
	);
}

function AddToCart() {
	const { selectedVariant } = useProductOptions();
	const { status: cartStatus } = useCart();
	const outOfStock = !selectedVariant?.availableForSale ?? true;

	const isLoadingState = () => cartStatus === "creating" || cartStatus === "fetching";
	const isIdleState = () => cartStatus === "idle" || cartStatus === "uninitialized";
	const disabled = isLoadingState() || (outOfStock && isIdleState());

	const [buttonText, setButtonText] = useState("Loading...");

	useEffect(() => {
		if (isLoadingState()) setButtonText("Loading...");
		if (isIdleState()) setButtonText(outOfStock ? "Sold out" : "Add to cart");
	}, [cartStatus]);

	return (
		<AddToCartButton
			variantId={selectedVariant?.id}
			quantity={1}
			accessibleAddingToCartLabel="Add this item to your cart"
			as={Button}
			color="matcha"
			disabled={disabled}
			className="px-6 py-4 text-base"
			onClick={() => {
				setButtonText("Added!");
			}}>
			{buttonText}
		</AddToCartButton>
	);
}

import { AddToCartButton, ProductPrice, useCart, useProductOptions } from "@shopify/hydrogen";
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
		<div className="flex flex-col space-y-16">
			<ProductDescription product={product} gallery={gallery} />
			<ProductMisc product={product} />
		</div>
	);
}

function ProductDescription({ product, gallery }: ProductInfoProps) {
	const { selectedVariant } = useProductOptions();
	const variantAvailable = selectedVariant?.availableForSale;

	const colors: Array<{ name: string; hex: string }> | null = product.colors?.value
		? JSON.parse(product.colors.value)
		: null;

	return (
		<div className="flex flex-col space-y-16">
			<div className="space-y-8">
				<h1 className="text-matcha text-3xl leading-10 md:text-4xl">{product.title}</h1>
				{product.summary?.value ? (
					<p className="prose text-walnut leading-7">{product.summary?.value}</p>
				) : null}
				{colors ? (
					<ul className="flex flex-row flex-wrap gap-4">
						{colors.map((color) => (
							<li key={color.name} className="flex items-center justify-start space-x-4">
								<div className="h-5 w-5 rounded-full" style={{ backgroundColor: color.hex }} />
								<span className="font-medium text-matcha text-sm leading-5">{color.name}</span>
							</li>
						))}
					</ul>
				) : null}
			</div>
			<div className="flex flex-col items-start space-y-6 text-matcha text-xl leading-8 lg:text-2xl">
				<VariantSelector gallery={gallery} />
				<span className="flex">
					{(variantAvailable && selectedVariant?.priceV2?.currencyCode) ||
						product.priceRange?.minVariantPrice?.currencyCode ||
						product.priceRange?.maxVariantPrice?.currencyCode}
					&nbsp;
					<ProductPrice
						as="span"
						data={product}
						withoutTrailingZeros={true}
						variantId={variantAvailable ? selectedVariant?.id : undefined}
					/>
				</span>
				<AddToCart />
			</div>
		</div>
	);
}

function ProductMisc({ product }: { product: ProductDetailsFragment }) {
	const detailsLines = String(product.detailsHtml)
		.split("\n")
		.filter((line) => !line.includes("meta charset"));
	const detailsListItems = detailsLines
		.map((line) => {
			const withoutTags = line.replace(/<[^>]*>?/g, "");
			const [key, value] = withoutTags.split(":");
			// eslint-disable-next-line no-sparse-arrays
			if (withoutTags === line || !value) return [, line.trim()];
			return [key.trim(), value.trim()];
		})
		.filter(([key = "", value = ""]) => {
			const line = (key + value).trim();
			const withoutTags = line.replace(/<\/?[^>]*>/g, "");
			return withoutTags.length;
		});

	return (
		<div className="flex flex-col space-y-16 text-walnut">
			<div className="flex flex-col space-y-16">
				{(product.groupBuyDates?.value || product.estimatedDelivery?.value) && (
					<div className="flex flex-col space-y-8 text-lg lg:flex-row lg:items-center lg:space-y-0 lg:space-x-16">
						{product.groupBuyDates?.value ? (
							<div className="flex items-center space-x-4">
								<ClockIcon className="h-6 w-6 text-walnut-80" />
								<span className="trim-both leading-none">Available {product.groupBuyDates.value}</span>
							</div>
						) : null}
						{product.estimatedDelivery?.value ? (
							<div className="flex items-center space-x-4">
								<AirplaneIcon className="h-6 w-6 text-walnut-80" />
								<span className="trim-both leading-none">Ships {product.estimatedDelivery.value}</span>
							</div>
						) : null}
					</div>
				)}
				<ul className="flex flex-col space-y-4">
					{detailsListItems.map(([key, value]) => (
						<li key={key || value} className="flex space-x-8 text-base leading-6">
							<p
								className={clsx("font-regular", !!key && "text-walnut-80")}
								dangerouslySetInnerHTML={{ __html: key || value || "" }}></p>
							{key && <p className="font-medium" dangerouslySetInnerHTML={{ __html: value || "" }}></p>}
						</li>
					))}
				</ul>
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
							isSelected && (isAvailable ? "bg-walnut" : "bg-grain text-walnut-60"),
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

import { useProductOptions, AddToCartButton, ProductPrice } from "@shopify/hydrogen";
import clsx from "clsx";
import type { RefObject } from "react";
import type ImageGallery from "react-image-gallery";
import type { ProductDetailsFragment } from "../../graphql/generated";
import { Button } from "../elements/Button";
import { ClockIcon } from "../../assets/icons/clock";
import { AirplaneIcon } from "../../assets/icons/airplane";
import { InputWithButton } from "../elements/InputWithButton";
import { SocialLinks } from "../elements/SocialLinks";

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
	const { variants, selectedVariant, setSelectedVariant } = useProductOptions();
	const colors: Array<{ name: string; hex: string }> | null = product.colors?.value
		? JSON.parse(product.colors.value)
		: null;
	if (!selectedVariant) setSelectedVariant(variants?.[0] as never);

	return (
		<div className="flex flex-col space-y-12">
			<div className="space-y-8">
				<h1 className="text-matcha text-4xl leading-10">{product.title}</h1>
				{product.summary?.value ? (
					<p className="prose text-walnut leading-7">{product.summary?.value}</p>
				) : null}
				{colors ? (
					<div className="flex flex-row space-x-4">
						{colors.map((color) => (
							<div key={color.name} className="flex items-center justify-start space-x-4">
								<div className="h-8 w-8 rounded-full" style={{ backgroundColor: color.hex }} />
								<span className="font-medium text-matcha text-base">{color.name}</span>
							</div>
						))}
					</div>
				) : null}
			</div>
			<div className="flex flex-col items-start space-y-8 text-walnut text-2xl leading-8">
				<VariantSelector gallery={gallery} />
				<span className="flex space-x-0">
					{selectedVariant?.priceV2?.currencyCode}&nbsp;
					<ProductPrice
						as="span"
						data={product}
						withoutTrailingZeros={true}
						variantId={selectedVariant?.id}
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
	const detailsListItems = detailsLines.map((line) => {
		const withoutListTags = line.replace(/<\/?li.*?>/g, "");
		if (withoutListTags === line) return [null, line.trim()];
		return withoutListTags
			.split(": ")
			.slice(0, 2)
			.map((s) => s.trim());
	});

	return (
		<div className="flex flex-col space-y-16 text-walnut">
			<div className="flex flex-col space-y-16">
				<div className="flex items-center space-x-16 text-lg">
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
				<div className="flex flex-col space-y-4">
					{detailsListItems.map(([key, value]) => (
						<span key={key} className="flex space-x-8 text-base leading-6">
							<span className="font-regular text-walnut-80">{key}</span>
							<span className="font-medium">{value}</span>
						</span>
					))}
				</div>
			</div>
			<ProductUpdates />
		</div>
	);
}

function ProductUpdates() {
	return (
		<div className="flex flex-col space-y-6">
			<p className="text-walnut text-lg leading-7">
				To keep up with production and shipping, sign up for email updates or join our community on social
				media!
			</p>
			<InputWithButton color="grain-walnut" placeholder="Your email" buttonText="Subscribe" />
			<SocialLinks iconClasses="h-6 w-6 text-walnut hover:text-matcha" />
		</div>
	);
}

function VariantSelector({ gallery }: { gallery: RefObject<ImageGallery> }) {
	const { variants, selectedVariant, setSelectedVariant } = useProductOptions();
	if (!variants || variants.length === 1) return null;
	return (
		<div className="flex space-x-4">
			{variants.map((variant) =>
				variant ? (
					<Button
						key={variant.id}
						color="walnut"
						className={clsx("px-4 py-2", variant.id === selectedVariant?.id && "bg-walnut text-grain")}
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
				) : null,
			)}
		</div>
	);
}

function AddToCart() {
	const { selectedVariant } = useProductOptions();
	const outOfStock = selectedVariant?.availableForSale === false || false;
	return (
		<AddToCartButton
			variantId={selectedVariant?.id}
			quantity={1}
			accessibleAddingToCartLabel="Add this item to your cart"
			as="div">
			<Button color="matcha" disabled={outOfStock} className="px-6 py-4 text-lg">
				{outOfStock ? "Sold out" : "Add to Cart"}
			</Button>
		</AddToCartButton>
	);
}
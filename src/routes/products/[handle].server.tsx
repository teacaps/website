import { gql, ShopifyAnalyticsConstants, useRouteParams, useServerAnalytics, useShopQuery } from "@shopify/hydrogen";
import { Suspense } from "react";
import { CustomSeo } from "../../components/global/CustomSeo.server";

import { Layout } from "../../components/global/Layout.server";
import { NotFound } from "../../components/global/NotFound.server";
import { ProductDisplay } from "../../components/product/ProductDisplay.client";
import { ScrollTracker } from "../../lib/GoogleAnalytics.client";
import type { ProductQuery } from "../../graphql/storefront.generated";

export default function Product() {
	const { handle } = useRouteParams();

	const product = useShopQuery<ProductQuery>({
		query: PRODUCT_QUERY,
		variables: { handle },
	})?.data?.product;

	if (!product) return <NotFound type="404" />;

	useServerAnalytics({
		shopify: {
			pageType: ShopifyAnalyticsConstants.pageType.product,
			resourceId: product.id,
		},
	});

	return (
		<Layout>
			<Suspense>
				<CustomSeo
					type="product"
					data={{
						...product,
						seo: { title: product.title, description: product.summary?.value },
					}}
					image={undefined}
					thumbnail={product.featuredImage?.url}
				/>
				<ScrollTracker event_category="Product Scroll Depth" />
			</Suspense>
			<div className="h-full w-full pb-8 sm:pb-16">
				<ProductDisplay product={product} />
			</div>
		</Layout>
	);
}

const PRODUCT_QUERY = gql`
	fragment Media on Media {
		mediaContentType
		... on MediaImage {
			id
			image {
				url
				altText
				height
				width
			}
		}
		previewImage {
			url
			altText
			height
			width
		}
	}
	fragment ProductVariant on ProductVariant {
		id
		title
		sku
		availableForSale
		selectedOptions {
			name
			value
		}
		price {
			amount
			currencyCode
		}
		unitPrice {
			amount
			currencyCode
		}
		compareAtPrice {
			amount
			currencyCode
		}
		# Only included because required by <ProductSeo />
		priceV2 {
			amount
			currencyCode
		}
		image {
			id
			url
		}
	}
	fragment ProductDetails on Product {
		id
		title
		description
		seo {
			title
			description
		}
		featuredImage {
			url
		}
		detailsHtml: descriptionHtml
		media(first: 99) {
			nodes {
				...Media
			}
		}
		variants(first: 99) {
			nodes {
				...ProductVariant
			}
		}
		priceRange {
			minVariantPrice {
				amount
				currencyCode
			}
			maxVariantPrice {
				amount
				currencyCode
			}
		}
		compareAtPriceRange {
			minVariantPrice {
				amount
				currencyCode
			}
			maxVariantPrice {
				amount
				currencyCode
			}
		}
		summary: metafield(namespace: "udesly", key: "description") {
			value
		}
		estimatedDelivery: metafield(namespace: "custom", key: "estimated_delivery") {
			value
		}
		groupBuyDates: metafield(namespace: "custom", key: "group_buy_dates") {
			value
		}
		status: metafield(namespace: "custom", key: "status") {
			value
		}
		preorder: metafield(namespace: "custom", key: "preorder") {
			value
		}
		externalUrl: metafield(namespace: "custom", key: "external") {
			value
		}
		collections(first: 99) {
			nodes {
				id
				title
				handle
				isColorway: metafield(namespace: "custom", key: "is_colorway") {
					key
					value
				}
				products(first: 99) {
					nodes {
						id
						title
						handle
						availableForSale
						priceRange {
							minVariantPrice {
								amount
								currencyCode
							}
							maxVariantPrice {
								amount
								currencyCode
							}
						}
						featuredImage {
							url
							altText
							height
							width
						}
						variants(first: 99) {
							nodes {
								priceV2 {
									amount
									currencyCode
								}
							}
						}
					}
				}
			}
		}
	}
	query Product($handle: String!) {
		product(handle: $handle) {
			...ProductDetails
		}
	}
`;

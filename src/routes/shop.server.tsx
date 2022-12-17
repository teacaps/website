import { CacheLong, gql, useLocalization, useShopQuery } from "@shopify/hydrogen";
import { Suspense } from "react";

import { Container } from "../components/global/Container";
import { CustomSeo } from "../components/global/CustomSeo.server";
import { Layout } from "../components/global/Layout.server";
import { NotFound } from "../components/global/NotFound.server";
import { Featured } from "../components/shop/Featured.server";
import { ShopProductDisplay } from "../components/shop/ShopProductDisplay.client";
import { ScrollTracker } from "../lib/GoogleAnalytics.client";
import type { ShopQuery } from "../graphql/storefront.generated";

export default function Shop() {
	const {
		language: { isoCode: language },
		country: { isoCode: country },
	} = useLocalization();
	const { data } = useShopQuery<ShopQuery>({
		query: PRODUCTS_QUERY,
		variables: { country, language },
		cache: CacheLong(),
		preload: true,
	});
	const {
		collections: { nodes: collections },
	} = data;

	const featuredCollection = collections.find((col) => col.handle === "featured");
	const featured = featuredCollection?.products.nodes[0];

	const colorwayCollections = collections.filter((col) => col.isColorway?.value === "true");
	const products = colorwayCollections
		.flatMap((col) => col.products.nodes)
		.sort((a, b) => {
			const aInStock = Number(a.availableForSale);
			const bInStock = Number(b.availableForSale);
			return bInStock - aInStock;
		});

	if (!collections.length) return <NotFound type="error" />;

	return (
		<Layout>
			<Suspense>
				<CustomSeo type="page" />
				<ScrollTracker />
			</Suspense>
			<Container className="mt-4 mb-16 flex flex-col items-center justify-start space-y-12 sm:mt-8 md:mb-24 md:space-y-16">
				{featured ? <Featured product={featured} /> : null}
				<ShopProductDisplay collections={collections} products={products} />
			</Container>
		</Layout>
	);
}

// TODO: not fetch all collections at once when we have more
const PRODUCTS_QUERY = gql`
	fragment ProductOverview on Product {
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
		variants(first: 99) {
			edges {
				node {
					priceV2 {
						amount
						currencyCode
					}
				}
			}
		}
		featuredImage {
			id
			url
			altText
			width
			height
		}
		collections(first: 99) {
			nodes {
				id
			}
		}
	}
	fragment Collection on Collection {
		id
		handle
		title
		isColorway: metafield(namespace: "custom", key: "is_colorway") {
			key
			value
		}
		products(first: 99, sortKey: COLLECTION_DEFAULT, reverse: true) {
			nodes {
				...ProductOverview
			}
		}
	}
	query Shop($country: CountryCode!, $language: LanguageCode!) @inContext(country: $country, language: $language) {
		collections(first: 99, sortKey: UPDATED_AT, reverse: true) {
			nodes {
				...Collection
			}
		}
	}
`;

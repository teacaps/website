import { CacheLong, gql, Seo, ShopifyAnalyticsConstants, useServerAnalytics, useShopQuery } from "@shopify/hydrogen";

import { Layout } from "../components/global/Layout.server";
import { Hero } from "../components/landing/Hero.client";
import { ProductSection } from "../components/landing/LandingProductSection";
import { Welcome } from "../components/landing/Welcome";
import type { ShopInfoQuery } from "../graphql/storefront.generated";

export default function Landing() {
	useServerAnalytics({
		shopify: {
			pageType: ShopifyAnalyticsConstants.pageType.home,
		},
	});
	return (
		<Layout>
			<LandingSeo />
			<Hero />
			<Welcome />
			<ProductSection
				name="Sencha"
				description="From the rolling hills of Japan comes a set themed after one of our favorite teas - Sencha. With soft green undertones, TeaPBT Sencha embraces the feeling of a warm cup of tea on a cool fall afternoon."
				url="/products/sencha"
				align="left"
				imageDimensions={{ width: 1000, height: 528 }}
			/>
			{/* <Timeline /> */}
		</Layout>
	);
}

function LandingSeo() {
	const {
		data: {
			shop: { name, description },
		},
	} = useShopQuery<ShopInfoQuery>({
		query: LANDING_SEO_QUERY,
		cache: CacheLong(),
		preload: true,
	});

	return (
		<Seo
			type="homepage"
			data={{
				title: name,
				description,
			}}
		/>
	);
}

const LANDING_SEO_QUERY = gql`
	query ShopInfo {
		shop {
			name
			description
		}
	}
`;

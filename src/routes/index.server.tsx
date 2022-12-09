import { ShopifyAnalyticsConstants, useServerAnalytics } from "@shopify/hydrogen";
import { Suspense } from "react";

import { CustomSeo } from "../components/global/CustomSeo.server";
import { Layout } from "../components/global/Layout.server";
import { Hero } from "../components/landing/Hero.client";
import { ProductSection } from "../components/landing/LandingProductSection";
import { Welcome } from "../components/landing/Welcome";

export default function Landing() {
	useServerAnalytics({
		shopify: {
			pageType: ShopifyAnalyticsConstants.pageType.home,
		},
	});
	return (
		<Layout>
			<Suspense>
				<CustomSeo type="homepage" />
			</Suspense>
			<Hero />
			<Welcome />
			<ProductSection
				name="Brown Sugar Boba"
				description="Inspired by the delicious Brown Sugar Boba drink, created in Taiwan and loved around the world. Version two of Brown Sugar Boba features updated legends and revised novelty kitting."
				url="/products/brown-sugar-boba"
				align="left"
				imageDimensions={{ width: 1000, height: 568 }}
			/>
			<ProductSection
				name="Ritual"
				description="Crisp mornings and quiet evenings. Nothing brings comfort like habits and routines. Ritual encompasses the feeling of a routine well-kept. Choose from a lighter morning variant, or a darker  evening variant."
				url="/products/ritual"
				align="right"
				imageDimensions={{ width: 1000, height: 582 }}
			/>
			{/* <Timeline /> */}
		</Layout>
	);
}

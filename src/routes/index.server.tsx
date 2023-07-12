import { ShopifyAnalyticsConstants, useServerAnalytics } from "@shopify/hydrogen";
import { Suspense } from "react";

import { CustomSeo } from "../components/global/CustomSeo.server";
import { Layout } from "../components/global/Layout.server";
import { Hero } from "../components/landing/Hero.client";
import { ProductSection } from "../components/landing/LandingProductSection";
import { Welcome } from "../components/landing/Welcome";
import { ScrollTracker } from "../lib/GoogleAnalytics.client";

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
				<ScrollTracker />
			</Suspense>
			<Hero />
			<Welcome />
			<ProductSection
				name="Rosewater"
				description="Take a stroll through a tranquil garden with Rosewater. Soft pink tones bring out the best of a warm spring day."
				url="/products/rosewater"
				align="left"
				imageDimensions={{ width: 1000, height: 438 }}
			/>
			<ProductSection
				name="Parfait"
				description="Sweeten your setup with Parfait, a set inspired by our favorite desserts. Parfait draws from the creamy hues of the delicious frozen treat."
				url="/products/parfait"
				align="right"
				imageDimensions={{ width: 1000, height: 510 }}
			/>
			<ProductSection
				name="Brown Sugar Boba"
				description="Inspired by the delicious Brown Sugar Boba drink, created in Taiwan and loved around the world. Version two of Brown Sugar Boba features updated legends and revised novelty kitting."
				url="/products/brown-sugar-boba"
				align="left"
				imageDimensions={{ width: 1000, height: 568 }}
			/>
			{/* <Timeline /> */}
		</Layout>
	);
}

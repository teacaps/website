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

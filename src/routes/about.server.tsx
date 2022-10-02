import { CacheLong, useShopQuery } from "@shopify/hydrogen";
import { Suspense } from "react";

import { Graphic } from "../assets/graphic";
import { Container } from "../components/global/Container";
import { CustomSeo } from "../components/global/CustomSeo.server";
import { Layout } from "../components/global/Layout.server";
import { NotFound } from "../components/global/NotFound.server";
import { PAGE_QUERY } from "./[page].server";
import type { PageQuery } from "../graphql/storefront.generated";

export default function About() {
	const {
		data: { page },
	} = useShopQuery<PageQuery>({
		query: PAGE_QUERY,
		variables: { handle: "about" },
		cache: CacheLong(),
		preload: "*",
	});
	if (!page || !page.title || !page.body) return <NotFound type="404" />;
	return (
		<Layout className="h-full max-h-screen w-full">
			<Suspense>
				<CustomSeo type="page" data={page} image="/about-og-image.png" />
			</Suspense>
			<Container className="flex h-full items-center justify-center">
				<div className="-mt-12 flex w-4/5 flex-col items-center justify-start space-y-6 py-24 xl:w-2/3 tall:justify-center">
					<h1 className="pb-2 text-center text-matcha trim-both text-2xl md:text-3xl">
						Tea, keycaps, and friends.
					</h1>
					<p
						className="text-center text-walnut leading-7 md:text-lg"
						dangerouslySetInnerHTML={{ __html: page.body }}
					/>
					<Graphic className="h-5 text-matcha" />
				</div>
			</Container>
		</Layout>
	);
}

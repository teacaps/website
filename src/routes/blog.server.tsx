import { CacheShort, gql, useShopQuery } from "@shopify/hydrogen";
import { Suspense } from "react";

import { BlogPreview } from "../components/blog/BlogPreview";
import { Container } from "../components/global/Container";
import { CustomSeo } from "../components/global/CustomSeo.server";
import { Layout } from "../components/global/Layout.server";
import type { BlogQuery } from "../graphql/storefront.generated";

export default function Blog() {
	const {
		data: {
			articles: { nodes: articles },
		},
	} = useShopQuery<BlogQuery>({
		query: BLOG_QUERY,
		cache: CacheShort(),
	});
	return (
		<Layout className="h-full max-h-screen w-full">
			<Suspense>
				<CustomSeo type="page" data={{ title: "Teacaps Blog" }} image="/about-og-image.png" />
			</Suspense>
			<Container className="my-16 flex justify-center">
				<div className="flex flex-col space-y-12">
					{articles.length ? (
						articles.map((article) => <BlogPreview key={article.handle} article={article} />)
					) : (
						<span className="text-center text-walnut">
							{
								"There don't seem to be any articles just yet. Be sure to check in soon to hear from the Teacaps team!"
							}
						</span>
					)}
				</div>
			</Container>
		</Layout>
	);
}

const BLOG_QUERY = gql`
	query Blog {
		# TODO: Should probably implement pagination at some point
		articles(first: 99) {
			nodes {
				title
				excerpt
				publishedAt
				handle
				image {
					url
					altText
					height
					width
				}
			}
		}
	}
`;

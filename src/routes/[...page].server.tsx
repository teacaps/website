import { CacheLong, gql, HydrogenRouteProps, Seo, useShopQuery } from "@shopify/hydrogen";
import { Suspense } from "react";
import { Container } from "../components/global/Container";
import { Layout } from "../components/global/Layout.server";
import { NotFound } from "../components/global/NotFound.server";
import type { PageQuery } from "../graphql/storefront.generated";

export default function Page({ request }: HydrogenRouteProps) {
	const { page: handle } = request.ctx.router.routeParams;
	if (!handle) return <NotFound />;

	const {
		data: { page },
	} = useShopQuery<PageQuery>({
		query: PAGE_QUERY,
		variables: { handle },
		cache: CacheLong(),
		preload: "*",
	});
	if (!page || !page.title || !page.body) return <NotFound />;

	return (
		<Layout>
			<Suspense>
				<Seo type="page" data={page} />
			</Suspense>
			<Container className="my-16 mx-2 flex items-center justify-center sm:mx-0">
				<div
					className="prose prose-sm list-outside list-disc prose-headings:font-medium prose-h4:!leading-10 sm:prose-base lg:prose-lg"
					dangerouslySetInnerHTML={{ __html: page.body }}
				/>
			</Container>
		</Layout>
	);
}

export const PAGE_QUERY = gql`
	query Page($handle: String!) {
		page(handle: $handle) {
			title
			body
			bodySummary
			seo {
				title
				description
			}
		}
	}
`;

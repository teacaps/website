import { CacheLong, gql, useShopQuery } from "@shopify/hydrogen";
import { Suspense } from "react";
import { Container } from "../components/global/Container";
import { CustomSeo } from "../components/global/CustomSeo.server";
import { Layout } from "../components/global/Layout.server";
import { NotFound } from "../components/global/NotFound.server";
import type { PageQuery } from "../graphql/storefront.generated";
import type { HydrogenRouteProps } from "@shopify/hydrogen";

export default function Page({ request, response }: HydrogenRouteProps) {
	const { page: handle } = request.ctx.router.routeParams;
	if (!handle) return <NotFound type="error" />;

	const {
		data: { page, urlRedirects },
	} = useShopQuery<PageQuery>({
		query: PAGE_QUERY,
		variables: { handle },
		cache: CacheLong(),
		preload: "*",
	});

	const redirect = urlRedirects.nodes.find((redirect) => `/${handle}` === redirect.path);
	if (redirect) return response.redirect(redirect.target);

	if (!page || !page.title || !page.body) return <NotFound type="404" />;

	return (
		<Layout>
			<Suspense>
				<CustomSeo type="page" data={page} />
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
		urlRedirects(first: 99) {
			nodes {
				path
				target
			}
		}
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

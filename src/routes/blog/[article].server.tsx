import { gql, useRouteParams, useShopQuery, Image, type HydrogenRouteProps } from "@shopify/hydrogen";
import { Suspense } from "react";
import { Graphic } from "../../assets/graphic";
import { Breadcrumbs } from "../../components/elements/Breadcrumbs";
import { Container } from "../../components/global/Container";
import { CustomSeo } from "../../components/global/CustomSeo.server";
import { Layout } from "../../components/global/Layout.server";
import { NotFound } from "../../components/global/NotFound.server";
import type { ArticleQuery } from "../../graphql/storefront.generated";

export default function Article({ request }: HydrogenRouteProps) {
	const { article: handle } = useRouteParams();

	const { blog } = useShopQuery<ArticleQuery>({
		query: ARTICLE_QUERY,
		variables: { handle },
	}).data;
	const article = blog?.articleByHandle;

	if (!article?.title || !article?.contentHtml) return <NotFound type="404" />;

	const url = new URL(request.normalizedUrl);
	let pathname = url.pathname;
	if (pathname.startsWith("/blog")) pathname = pathname.slice(5);
	if (pathname.endsWith("/")) pathname = pathname.slice(0, -1);
	const pathFragments = pathname
		.split("/")
		.filter((fragment) => fragment)
		.map((fragment, i, arr) =>
			fragment === handle
				? { name: article.title, href: url.href }
				: {
						name: fragment,
						href: "/" + arr.slice(0, i + 1).join("/"),
				  },
		);

	const publishedAt = new Intl.DateTimeFormat("default", { year: "numeric", month: "short", day: "numeric" }).format(
		new Date(article.publishedAt),
	);

	return (
		<Layout>
			<Suspense>
				<CustomSeo
					type="page"
					data={{
						title: article.title,
						description: article.excerpt,
						seo: article.seo,
						image: article.image,
					}}
				/>
			</Suspense>
			<Container className="flex items-center">
				<div className="mx-auto flex w-full max-w-[65ch] flex-col items-center pt-8 pb-16">
					<Breadcrumbs
						className="mb-8 self-start"
						pages={[{ name: "Teacaps", href: "/" }, { name: "Blog", href: "/blog" }, ...pathFragments]}
					/>
					{article.image && (
						<Image
							data={article.image!}
							alt={article.image?.altText || article.excerpt || article.title}
							className="prose mb-12 max-h-96 w-full max-w-[65ch] rounded-3xl object-cover text-lg lg:prose-lg"
						/>
					)}
					<article className="prose mx-auto w-full prose-img:rounded-3xl lg:prose-lg">
						<span role="heading" aria-level={1} className="block font-normal text-2xl lg:text-3xl">
							{article.title}
						</span>
						<span className="text-walnut-80 text-sm lg:text-base">{publishedAt}</span>
						<div className="mt-6 w-full" dangerouslySetInnerHTML={{ __html: article.contentHtml }}></div>
						<Graphic className="mt-8 h-4 lg:h-5" />
					</article>
				</div>
			</Container>
		</Layout>
	);
}

const ARTICLE_QUERY = gql`
	query Article($handle: String!) {
		blog(handle: "news") {
			articleByHandle(handle: $handle) {
				title
				excerpt
				contentHtml
				publishedAt
				image {
					url
					altText
					height
					width
				}
				seo {
					title
					description
				}
			}
		}
	}
`;

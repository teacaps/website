import { gql, useRouteParams, useShopQuery, Image } from "@shopify/hydrogen";
import { Suspense } from "react";
import { Graphic } from "../../assets/graphic";
import { Container } from "../../components/global/Container";
import { CustomSeo } from "../../components/global/CustomSeo.server";
import { Layout } from "../../components/global/Layout.server";
import { NotFound } from "../../components/global/NotFound.server";
import type { ArticleQuery } from "../../graphql/storefront.generated";

export default function Article() {
	const { article: handle } = useRouteParams();

	const { blog } = useShopQuery<ArticleQuery>({
		query: ARTICLE_QUERY,
		variables: { handle },
	}).data;
	const article = blog?.articleByHandle;

	if (!article?.title || !article?.contentHtml) return <NotFound type="404" />;

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
			<Container className="flex flex-col items-center gap-y-12 pt-16 pb-24">
				<Image
					data={article.image!}
					alt={article.image?.altText || article.excerpt || article.title}
					className="prose max-h-96 w-full max-w-[65ch] rounded-3xl object-cover text-lg lg:prose-lg"
				/>
				<div className="prose mx-auto w-full lg:prose-lg">
					<h1 className="mb-0 font-normal text-2xl lg:text-3xl">{article.title}</h1>
					<span className="text-walnut-80 text-sm lg:text-base">{publishedAt}</span>
					<div className="mt-6 w-full" dangerouslySetInnerHTML={{ __html: article.contentHtml }}></div>
					<Graphic className="mt-8 h-4 lg:h-5" />
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

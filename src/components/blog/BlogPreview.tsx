import { Image, Link } from "@shopify/hydrogen";
import type { BlogQuery } from "../../graphql/storefront.generated";

type BlogPreviewProps = {
	article: BlogQuery["articles"]["nodes"][number];
};
export function BlogPreview({ article }: BlogPreviewProps) {
	const { title, excerpt, handle, image } = article;
	const publishedAt = new Intl.DateTimeFormat("default", { month: "short", day: "numeric" }).format(
		new Date(article.publishedAt),
	);
	return (
		<Link to={`/blog/${handle}`}>
			<div className="flex flex-row-reverse items-center justify-center gap-4 sm:flex-row sm:gap-8 md:gap-12">
				{image && (
					<Image
						className="aspect-square w-1/4 rounded-xl object-cover xs:rounded-2xl sm:aspect-[5/4] sm:w-1/3 md:rounded-3xl lg:w-1/4"
						data={image}
						alt={image.altText || title}
					/>
				)}
				<div className="flex w-auto flex-col space-y-2 text-sm lg:text-base xl:max-w-[60ch]">
					<h3 className="font-medium text-matcha text-xl">{title}</h3>
					<p className="text-walnut line-clamp-2 leading-6 sm:line-clamp-3">{excerpt}</p>
					<span className="font-medium text-walnut-80 text-sm leading-6">{publishedAt}</span>
				</div>
			</div>
		</Link>
	);
}

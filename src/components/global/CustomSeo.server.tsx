import { CacheLong, gql, Head, Seo, useShopQuery, useUrl } from "@shopify/hydrogen";
import type { ShopInfoQuery } from "../../graphql/storefront.generated";

type DefaultSeoProps = Parameters<typeof Seo>[0];
export type CustomSeoProps = Partial<DefaultSeoProps> & {
	color?: string;
	image?: string | undefined;
	thumbnail?: string | undefined;
};
export function CustomSeo(props: CustomSeoProps) {
	const { data = {}, ...rest } = props;
	const { data: shopData, errors } = useShopQuery<ShopInfoQuery>({
		query: SHOP_INFO_QUERY,
		cache: CacheLong(),
		preload: "*",
	});
	const { shop } = shopData ?? {};
	const { name, description } = shop ?? {};

	if (errors) console.log(errors);

	const url = useUrl();
	const image = props.image?.includes("://") ? props.image : url.origin + (props.image || "/landing-og-image.png");

	return (
		<>
			<Seo
				type="defaultSeo"
				data={{
					title: name,
					// @ts-expect-error TS2322 - TS is not a fan of the `Seo` component's discriminated union
					description: description || undefined,
					...data,
				}}
				{...rest}
			/>
			<Head>
				{!("image" in data) && <meta name="og:image" content={image} />}
				{!props.thumbnail && <meta name="twitter:card" content="summary_large_image" />}
				<meta name="theme-color" content={props.color || "#336C61"} />
			</Head>
		</>
	);
}

const SHOP_INFO_QUERY = gql`
	query shopInfo {
		shop {
			name
			description
		}
	}
`;

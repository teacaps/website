import { CacheLong, gql, Head, Seo, useShopQuery } from "@shopify/hydrogen";
import type { ShopInfoQuery } from "../../graphql/storefront.generated";

type DefaultSeoProps = Parameters<typeof Seo>[0];
export type CustomSeoProps = Omit<Partial<DefaultSeoProps>, "data"> & {
	data?: DefaultSeoProps["data"];
	color?: string;
	image?: string | undefined;
};
export function CustomSeo(props: CustomSeoProps) {
	const { data = {}, ...rest } = props;
	const {
		data: {
			shop: { name, description },
		},
	} = useShopQuery<ShopInfoQuery>({
		query: SHOP_INFO_QUERY,
		cache: CacheLong(),
		preload: "*",
	});

	return (
		<>
			<Seo
				type="defaultSeo"
				data={{
					title: name,
					// @ts-expect-error TS2322 - TS is not a fan of the `Seo` component's discriminated union
					description,
					...data,
				}}
				{...rest}
			/>
			<Head>
				{!("image" in data) && (
					<meta name="og:image" content={props.image || "https://teacaps.studio/landing-og-image.png"} />
				)}
				<meta name="theme-color" content={props.color || "#336C61"} />
				<meta name="twitter:card" content="summary_large_image" />
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

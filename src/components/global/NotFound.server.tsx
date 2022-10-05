import { Seo } from "@shopify/hydrogen";
import { Suspense } from "react";
import { CatThink } from "../../assets/cat-think";
import { CartIcon } from "../../assets/icons/cart";
import { DiscordIcon } from "../../assets/icons/socials/discord";
import { ButtonLink } from "../elements/input/Button";
import { Container } from "./Container";
import { Layout } from "./Layout.server";

const body = {
	"404": "We can’t seem to find what you’re looking for!<br />Double check the URL, or you can:",
	"error": "Something went wrong here..<br />Try refreshing, or you can:",
};
export function NotFound({ type }: { type: "404" | "error" }) {
	return (
		<Layout className="relative h-full max-h-screen min-h-[500px] w-full sm:min-h-fit">
			<Suspense>
				<Seo type="noindex" data={{}} />
			</Suspense>
			<Container className="flex h-full items-start justify-center md:items-center">
				<div className="flex w-full flex-col items-center justify-start space-y-6 py-12 sm:w-3/4 md:py-16 xl:w-2/3 tall:justify-center">
					<h1 className="pb-2 text-center text-matcha trim-both text-3xl">Uh oh!</h1>
					<p
						className="text-center text-walnut text-lg leading-7 sm:text-xl"
						dangerouslySetInnerHTML={{ __html: body[type] }}
					/>
					<div className="flex flex-col gap-6 sm:flex-row">
						<ButtonLink
							color="matcha"
							className="w-full whitespace-nowrap sm:w-fit"
							url="/shop"
							icon={<CartIcon className="h-6" />}>
							{"See what's new"}
						</ButtonLink>
						<ButtonLink
							color="walnut"
							className="w-full whitespace-nowrap sm:w-fit"
							url="/discord"
							icon={<DiscordIcon className="h-6" />}>
							Join the Teahouse
						</ButtonLink>
					</div>
				</div>
			</Container>
			<CatThink className="absolute left-0 bottom-0 -z-10 h-1/4 w-auto xs:h-1/3 sm:-left-4 sm:h-1/3 md:h-1/3 lg:h-auto lg:w-1/6" />
		</Layout>
	);
}

/// <reference path="global.d.ts" />
import { CookieSessionStorage, defineConfig } from "@shopify/hydrogen/config";
export default defineConfig({
	shopify: () => {
		return {
			defaultCountryCode: "US",
			defaultLanguageCode: "EN",
			storeDomain: "checkout.teacaps.studio",
			storefrontToken: Oxygen?.env?.PUBLIC_STOREFRONT_API_TOKEN,
			privateStorefrontToken: Oxygen?.env?.PRIVATE_STOREFRONT_API_TOKEN,
			storefrontApiVersion: "2022-10",
		};
	},
	serverErrorPage: "./src/global/NotFound.server.tsx",
	session: CookieSessionStorage("__session", {
		path: "/",
		httpOnly: true,
		secure: import.meta.env.PROD,
		sameSite: "Strict",
		maxAge: 60 * 60 * 24 * 30,
	}),
});

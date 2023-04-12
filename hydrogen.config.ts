/// <reference path="global.d.ts" />
import { CookieSessionStorage, defineConfig } from "@shopify/hydrogen/config";

globalThis.Oxygen ??= { env: Oxygen?.env || (process.env as Record<string, string>) || import.meta.env };
export default defineConfig({
	shopify: {
		defaultCountryCode: "US",
		defaultLanguageCode: "EN",
		storeDomain: "checkout.teacaps.studio",
		storefrontToken: globalThis.Oxygen.env.PUBLIC_STOREFRONT_API_TOKEN,
		storefrontApiVersion: globalThis.Oxygen.env.PRIVATE_STOREFRONT_API_TOKEN,
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

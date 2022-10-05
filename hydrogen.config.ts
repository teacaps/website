/// <reference path="global.d.ts" />
import { defineConfig } from "@shopify/hydrogen/config";

globalThis.Oxygen ??= { env: (process.env as Record<string, string>) || import.meta.env };

export default defineConfig({
	shopify: {
		storeDomain: "checkout.teacaps.studio",
		storefrontToken: globalThis.Oxygen.env.STOREFRONT_TOKEN,
		storefrontApiVersion: globalThis.Oxygen.env.STOREFRONT_API_VERSION,
	},
	serverErrorPage: "./src/global/NotFound.server.tsx",
});

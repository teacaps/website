/// <reference path="global.d.ts" />
import { defineConfig } from "@shopify/hydrogen/config";

globalThis.Oxygen ??= { env: (process.env as Record<string, string>) || import.meta.env };

export default defineConfig({
	shopify: {
		storeDomain: `${globalThis.Oxygen.env.STOREFRONT_NAME}.myshopify.com`,
		storefrontToken: globalThis.Oxygen.env.STOREFRONT_TOKEN,
		storefrontApiVersion: globalThis.Oxygen.env.STOREFRONT_API_VERSION,
	},
});

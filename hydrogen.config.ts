/// <reference path="global.d.ts" />
import { defineConfig } from "@shopify/hydrogen/config";

Oxygen ??= { env: (process.env as Record<string, string>) || import.meta.env };

export default defineConfig({
	shopify: {
		storeDomain: `${Oxygen.env.STOREFRONT_NAME}.myshopify.com`,
		storefrontToken: Oxygen.env.STOREFRONT_TOKEN,
		storefrontApiVersion: Oxygen.env.STOREFRONT_API_VERSION,
	},
});

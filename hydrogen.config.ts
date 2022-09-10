import { defineConfig } from "@shopify/hydrogen/config";

declare const Oxygen: any;

export default defineConfig({
	shopify: {
		storeDomain: `${Oxygen?.env?.STOREFRONT_NAME!}.myshopify.com`,
		storefrontToken: Oxygen?.env?.STOREFRONT_TOKEN!,
		storefrontApiVersion: Oxygen?.env?.STOREFRONT_API_VERSION!,
	},
});

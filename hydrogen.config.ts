import { defineConfig } from "@shopify/hydrogen/config";

// Swap out for real config at a later date
export default defineConfig({
	shopify: {
		storeDomain: "hydrogen-preview.myshopify.com",
		storefrontToken: "3b580e70970c4528da70c98e097c2fa0",
		storefrontApiVersion: "2022-07",
	},
});

import hydrogen from "@shopify/hydrogen/plugin";
import netlify from "@netlify/hydrogen-platform/plugin";
import { defineConfig } from "vite";
export default defineConfig({
	plugins: [hydrogen(), netlify()],
});

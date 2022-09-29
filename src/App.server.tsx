import { CartProvider, FileRoutes, Route, Router, ShopifyAnalytics, ShopifyProvider } from "@shopify/hydrogen";
import renderHydrogen from "@shopify/hydrogen/entry-server";
import { Suspense } from "react";
import { NotFound } from "./components/global/NotFound.server";

globalThis.Oxygen ??= { env: (process.env as Record<string, string>) || import.meta.env };

function App() {
	return (
		<Suspense fallback={null}>
			<ShopifyProvider>
				<ShopifyAnalytics cookieDomain="teacaps.studio" />
				<CartProvider>
					<Router>
						<FileRoutes />
						<Route path="*" page={<NotFound type="404" />} />
					</Router>
				</CartProvider>
			</ShopifyProvider>
		</Suspense>
	);
}

export default renderHydrogen(App);

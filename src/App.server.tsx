import { CartProvider, FileRoutes, Router, ShopifyAnalytics, ShopifyProvider } from "@shopify/hydrogen";
import renderHydrogen from "@shopify/hydrogen/entry-server";
import { Suspense } from "react";

function App() {
	return (
		<Suspense fallback={null}>
			<ShopifyProvider>
				<ShopifyAnalytics cookieDomain="teacaps.studio" />
				<CartProvider>
					<Router>
						<FileRoutes />
					</Router>
				</CartProvider>
			</ShopifyProvider>
		</Suspense>
	);
}

export default renderHydrogen(App);

import {
	CartProvider,
	FileRoutes,
	Route,
	Router,
	ShopifyAnalytics,
	ShopifyProvider,
	type HydrogenRouteProps,
} from "@shopify/hydrogen";
import renderHydrogen from "@shopify/hydrogen/entry-server";
import { Suspense } from "react";
import { NotFound } from "./components/global/NotFound.server";

function App() {
	return (
		<Suspense fallback={null}>
			<ShopifyProvider>
				<ShopifyAnalytics cookieDomain="teacaps.studio" />
				<CartProvider>
					<Router>
						{/* Route checkout, orders, and invoices to Shopify */}
						<Route path="/:user/checkouts/:id" page={<ShopifyOrdersRedirect />} />
						<Route path="/:user/checkouts/:id/:param" page={<ShopifyOrdersRedirect />} />
						<Route path="/:user/orders/:id" page={<ShopifyOrdersRedirect />} />
						<Route path="/:user/orders/:id/:param" page={<ShopifyOrdersRedirect />} />
						<Route path="/:user/invoices/:id" page={<ShopifyOrdersRedirect />} />
						<FileRoutes />
						<Route path="*" page={<NotFound type="404" />} />
					</Router>
				</CartProvider>
			</ShopifyProvider>
		</Suspense>
	);
}

function ShopifyOrdersRedirect({ request, response }: Partial<HydrogenRouteProps>) {
	if (!request || !response) return null; // This will never actually happen
	const url = new URL(request.normalizedUrl);
	// Remove port in dev
	url.port = "";
	url.hostname = "orders.teacaps.studio";
	return response.redirect(url.href);
}

export default renderHydrogen(App);

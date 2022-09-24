import type { ReactNode } from "react";
import { Footer } from "./Footer.server";
import { Navigation } from "./Navigation.client";

const ShippingNotice = () => (
	<div className="flex h-auto w-full content-center justify-center bg-matcha py-2 px-4 text-sm sm:px-0 sm:text-base">
		<span className="text-center font-medium text-grain leading-6">Free domestic shipping on orders over $100</span>
	</div>
);

export function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-screen w-screen flex-col items-center">
			<ShippingNotice />
			<Navigation />
			<div className="mb-auto w-full">{children}</div>
			<Footer />
		</div>
	);
}

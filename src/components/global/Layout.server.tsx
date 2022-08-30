import { ReactNode } from "react";
import { Footer } from "./Footer.server";
import { Navigation } from "./Navigation.client";

const ShippingNotice = () => (
	<div className="flex h-auto w-full content-center justify-center bg-matcha py-2">
		<span className="text-center text-base font-medium leading-6 text-grain">
			Free domestic shipping on orders over $100
		</span>
	</div>
);

export function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-screen w-full flex-col items-center">
			<ShippingNotice />
			<Navigation />
			<div className="mb-auto w-full">{children}</div>
			<Footer />
		</div>
	);
}

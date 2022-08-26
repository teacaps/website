import { ReactNode } from "react";
import { Footer } from "./Footer.server";
import { Navigation } from "./Navigation.server";

const ShippingNotice = () => (
	<div className="bg-matcha w-full h-auto flex justify-center content-center py-2">
		<span className="text-base leading-6 font-medium text-grain text-center">
			Free domestic shipping on orders over $100
		</span>
	</div>
);

export function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="w-full h-screen flex flex-col items-center">
			<ShippingNotice />
			<Navigation />
			<div className="w-full h-auto mb-auto"> {children}</div>
			<Footer />
		</div>
	);
}

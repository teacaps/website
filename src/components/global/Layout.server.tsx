import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

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
			<div className="w-full h-auto mb-auto">{children}</div>
			<Footer />
		</div>
	);
}











import { Footer } from "../elements/footer/Footer.server";
import { Navigation } from "../elements/header/Navigation.client";
import { ShippingNotice } from "../elements/header/ShippingNotice";
import type { ReactNode } from "react";

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

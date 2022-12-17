import { GoogleAnalytics } from "../../lib/GoogleAnalytics.client";
import { Footer } from "../elements/footer/Footer.server";
import { Navigation } from "../elements/header/Navigation.client";
import { ShippingNotice } from "../elements/header/ShippingNotice";
import type { HTMLAttributes } from "react";

export function Layout(props: Partial<HTMLAttributes<HTMLDivElement>>) {
	return (
		<>
			<GoogleAnalytics />
			<div className="flex h-screen w-screen flex-col items-center overflow-x-hidden">
				<ShippingNotice />
				<Navigation />
				<div className="mb-auto w-full" {...props}></div>
				<Footer />
			</div>
		</>
	);
}

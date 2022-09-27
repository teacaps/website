import { Link } from "@shopify/hydrogen";

export function FooterNavigation() {
	return (
		<div className="flex flex-col space-y-4 text-grain leading-6">
			<Link to="/contact" className="hover:font-bold">
				Contact
			</Link>
			<Link to="/shipping-returns" className="hover:font-bold">
				Shipping & Returns
			</Link>
			<Link to="/tos-privacy" className="hover:font-bold">
				Terms & Privacy
			</Link>
		</div>
	);
}

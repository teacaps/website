import { Link } from "@shopify/hydrogen";

export function FooterNavigation() {
	return (
		<div className="only-of-type:a flex flex-col space-y-4 text-grain leading-6 hover:[&>a]:font-bold">
			<Link to="/blog">Blog</Link>
			<Link to="/contact-us">Contact</Link>
			<Link to="/shipping-returns">Shipping & Returns</Link>
			<Link to="/tos-privacy">Terms & Privacy</Link>
		</div>
	);
}

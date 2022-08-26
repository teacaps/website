import { Link } from "@shopify/hydrogen";
import { Container } from "../elements/Container";

function FooterNavigation() {
	return (
		<div className="flex flex-col space-y-4">
			<Link to="/" className="text-base leading-6 text-grain hover:underline">
				FAQ
			</Link>
			<Link to="/" className="text-base leading-6 text-grain hover:underline">
				Blog
			</Link>
			<Link to="/" className="text-base leading-6 text-grain hover:underline">
				Contact
			</Link>
			<Link to="/" className="text-base leading-6 text-grain hover:underline">
				Shipping & Returns
			</Link>
			<Link to="/" className="text-base leading-6 text-grain hover:underline">
				Terms & Privacy
			</Link>
		</div>
	);
}

export function Footer() {
	return (
		<div className="w-full h-auto bg-matcha">
			<Container className="py-16 flex justify-between items-center">
				<FooterNavigation />
			</Container>
		</div>
	);
}

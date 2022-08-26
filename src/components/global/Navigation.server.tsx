import { Link } from "@shopify/hydrogen";
import { Logo } from "../../assets/logo";
import { CartIcon } from "../../assets/icons/cart";
import { Container } from "../elements/Container";

export function Navigation() {
	return (
		<Container className="py-8 flex flex-row items-center">
			<nav className="h-6 basis-full space-x-12 text-base leading-6 font-normal text-walnut">
				<Link prefetch={true} to="/" className="hover:underline">
					Shop
				</Link>
				<Link prefetch={false} to="/" className="hover:underline">
					About
				</Link>
			</nav>
			<Link to="/">
				<Logo className="text-matcha h-9 basis-full"></Logo>
			</Link>
			<div className="basis-full flex justify-end">
				<CartIcon className="w-6 h-6 fill-walnut" />
			</div>
		</Container>
	);
}

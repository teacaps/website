import { Link } from "@shopify/hydrogen";
import { Logo } from "../../assets/logo";
import { CartIcon } from "../../assets/icons/cart";
import { Container } from "../elements/Container";

export function Navigation() {
	return (
		<Container className="flex flex-row items-center py-8">
			<nav className="h-6 basis-full space-x-12 text-base font-normal leading-6 text-walnut">
				<Link prefetch={true} to="/shop" className="hover:font-medium">
					Shop
				</Link>
				<Link prefetch={false} to="/" className="hover:font-medium">
					About
				</Link>
			</nav>
			<Link to="/">
				<Logo className="h-9 basis-full text-matcha"></Logo>
			</Link>
			<div className="flex basis-full justify-end">
				<CartIcon className="h-6 w-6 fill-walnut" />
			</div>
		</Container>
	);
}

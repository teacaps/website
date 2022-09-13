import { Link } from "@shopify/hydrogen";
import { Logo } from "../../assets/logo";
import { CartIcon } from "../../assets/icons/cart";
import { Container } from "../elements/Container";
import { Drawer, useDrawer } from "../cart/Drawer";
import { CartContents } from "../cart/CartContents.client";

export function Navigation() {
	const { isOpen, openDrawer, closeDrawer } = useDrawer();
	return (
		<>
			<Drawer show={isOpen} onClose={closeDrawer}>
				<CartContents />
			</Drawer>
			<Container className="flex flex-row items-center py-8">
				<nav className="h-6 basis-full space-x-12 font-normal text-walnut text-base leading-6">
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
					<button onClick={openDrawer} className="relative flex">
						<CartIcon className="h-6 w-6 fill-walnut" />
					</button>
				</div>
			</Container>
		</>
	);
}

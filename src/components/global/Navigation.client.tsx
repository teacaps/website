import { Link, useCart } from "@shopify/hydrogen";
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
						<CartBadge />
					</button>
				</div>
			</Container>
		</>
	);
}

function CartBadge() {
	const { totalQuantity = 0 } = useCart();
	if (!totalQuantity) return null;
	return (
		<div className="absolute -bottom-1 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-matcha px-[0.125rem] py-[0.125rem] pb-[0.25rem]">
			<span className="text-[0.75rem] text-center font-medium text-grain trim-both leading-none">
				{totalQuantity}
			</span>
		</div>
	);
}

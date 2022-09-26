import { Link, useCart } from "@shopify/hydrogen";
import clsx from "clsx";

import { CartIcon } from "../../../assets/icons/cart";
import { Logo } from "../../../assets/logo";
import { Teacap } from "../../../assets/teacap";
import { CartContents } from "../../cart/CartContents.client";
import { Container } from "../Container";
import { Drawer, useDrawer } from "../Drawer";

export function Navigation() {
	const { isOpen, openDrawer, closeDrawer } = useDrawer();

	const logoClasses = "h-5 xs:h-9 xl:basis-full text-matcha";
	return (
		<>
			<Drawer title="Cart" show={isOpen} onClose={closeDrawer}>
				<CartContents />
			</Drawer>
			<Container className="xl:justify-[normal] flex flex-row items-center justify-between py-8">
				<nav className="h-6 space-x-12 font-normal text-walnut text-sm leading-6 xl:basis-full xs:text-base">
					<Link prefetch={true} to="/shop" className="hover:font-medium">
						Shop
					</Link>
					<Link prefetch={false} to="/" className="hover:font-medium">
						About
					</Link>
				</nav>
				<Link to="/">
					<Teacap className={clsx(logoClasses, "lg:hidden")} />
					<Logo className={clsx(logoClasses, "hidden lg:block")} />
				</Link>
				<div className="flex justify-end xl:basis-full">
					<button onClick={openDrawer} className="relative flex">
						<CartIcon className="h-4 w-4 fill-walnut xs:h-6 xs:w-6" />
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

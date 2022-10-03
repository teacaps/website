import { Link, useCart } from "@shopify/hydrogen";
import clsx from "clsx";

import { CartIcon } from "../../../assets/icons/cart";
import { Logo } from "../../../assets/logo";
import { Teacap } from "../../../assets/teacap";
import { CartContents } from "../../cart/CartContents.client";
import { Container } from "../../global/Container";
import { Drawer, useDrawer } from "../Drawer";

export function Navigation() {
	const { isOpen, openDrawer, closeDrawer } = useDrawer();

	const logoClasses = "h-5 xs:h-7 sm:h-9 basis-full text-matcha";
	return (
		<>
			<Drawer title="Cart" show={isOpen} onClose={closeDrawer}>
				<CartContents />
			</Drawer>
			<Container className="flex w-full flex-row items-center py-8">
				<nav className="h-6 basis-full space-x-12 font-normal text-walnut text-sm leading-6 xs:text-base">
					<Link prefetch={true} to="/shop" className="hover:font-medium">
						Shop
					</Link>
					<Link prefetch={true} to="/about" className="hover:font-medium">
						About
					</Link>
				</nav>
				<Link to="/" className="order-first basis-full sm:order-none sm:basis-auto">
					<Teacap className={clsx(logoClasses, "md:hidden")} />
					<Logo className={clsx(logoClasses, "hidden md:block")} />
				</Link>
				<div className="flex basis-full justify-end">
					<button onClick={openDrawer} className="relative flex">
						<CartIcon className="h-4 fill-walnut xs:h-5 sm:h-6" />
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

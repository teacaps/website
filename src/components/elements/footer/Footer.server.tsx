import { Container } from "../Container";
import { SocialsAndUpdates } from "./SocialsAndUpdates.server";
import { FooterNavigation } from "./FooterNavigation.server";

export function Footer() {
	return (
		<div className="h-auto w-full bg-matcha">
			<Container className="flex flex-col items-start justify-between space-y-6 py-12 text-base sm:text-lg md:flex-row md:items-center md:space-x-8 md:space-y-0 md:py-16 lg:space-x-0">
				<FooterNavigation />
				<SocialsAndUpdates />
			</Container>
		</div>
	);
}

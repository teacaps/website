import { Link } from "@shopify/hydrogen";
import { Container } from "../elements/Container";
import { InputWithButton } from "../elements/InputWithButton";
import { ButtonLink } from "../elements/Button";
import { DiscordIcon } from "../../assets/icons/socials/discord";
import { SocialLinks } from "../elements/SocialLinks";

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

function FooterNavigation() {
	return (
		<div className="flex flex-col space-y-4 text-grain leading-6">
			<Link to="/" className="hover:font-bold">
				FAQ
			</Link>
			<Link to="/" className="hover:font-bold">
				Blog
			</Link>
			<Link to="/" className="hover:font-bold">
				Contact
			</Link>
			<Link to="/" className="hover:font-bold">
				Shipping & Returns
			</Link>
			<Link to="/" className="hover:font-bold">
				Terms & Privacy
			</Link>
		</div>
	);
}

function SocialsAndUpdates() {
	return (
		<div className="flex w-full flex-col space-y-4 text-grain md:w-2/3 lg:w-1/2">
			<span className="inline text-2xl leading-9 sm:text-3xl">Stay in the know</span>
			<div className="flex flex-col space-y-6">
				<p className="leading-7">
					Sign up for email updates to keep up with releases, or join our wonderful Discord community, the
					Teahouse, to find out what we’re all about!
				</p>
				<div className="flex flex-col space-y-6 sm:space-y-8">
					<InputWithButton
						color="grain-matcha"
						placeholder="Your email"
						buttonText="Subscribe"
						className="text-sm md:text-base"
						inputProps={{ className: "w-full" }}
					/>
					<div className="flex w-full max-w-full flex-col items-center justify-between space-y-6 sm:w-auto sm:w-full sm:flex-row sm:space-y-0">
						<ButtonLink
							url="https://teacaps.studio/discord"
							color="grain"
							className="w-full text-base sm:w-fit"
							icon={<DiscordIcon className="w-6" />}>
							Join the Teahouse
						</ButtonLink>
						<SocialLinks
							exclude={["discord"]}
							iconClasses="w-6 mx-2 sm:mx-0 text-grain hover:text-matcha-40"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

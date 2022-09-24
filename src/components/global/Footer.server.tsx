import { Link } from "@shopify/hydrogen";
import { Container } from "../elements/Container";
import { InputWithButton } from "../elements/InputWithButton";
import { ButtonLink } from "../elements/Button";
import { DiscordIcon } from "../../assets/icons/socials/discord";
import { SocialLinks } from "../elements/SocialLinks";

export function Footer() {
	return (
		<div className="h-auto w-full bg-matcha">
			<Container className="flex flex-col items-start justify-between space-y-6 py-12 text-base sm:flex-row sm:items-center sm:space-y-0 sm:py-16 sm:text-lg">
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
		<div className="flex w-full flex-col space-y-4 text-grain sm:w-1/2">
			<span className="hidden text-3xl leading-9 sm:inline">Stay in the know</span>
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
						className="text-sm sm:text-base"
						inputProps={{ className: "w-2/3 sm:w-unset" }}
					/>
					<div className="flex w-full max-w-full flex-col items-center justify-between space-y-6 sm:w-auto sm:w-full sm:flex-row sm:space-y-0">
						<ButtonLink
							url="https://teacaps.studio/discord"
							color="grain"
							className="w-full text-sm sm:w-fit sm:text-base"
							icon={<DiscordIcon className="w-4 sm:w-6" />}>
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

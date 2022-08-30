import { Link } from "@shopify/hydrogen";
import { Container } from "../elements/Container";
import { InputWithButton } from "../elements/InputWithButton";
import { ButtonLink } from "../elements/Button";
import { DiscordIcon } from "../../assets/icons/socials/discord";
import { SocialLinks } from "../elements/SocialLinks";

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

function SocialsAndUpdates() {
	return (
		<div className="flex w-1/2 flex-col space-y-4 text-grain">
			<span className="text-3xl leading-9">Stay in the know</span>
			<div className="flex flex-col space-y-6">
				<p className="text-lg leading-7">
					Sign up for email updates to keep up with releases, or join our wonderful Discord community, the
					Teahouse, to find out what we’re all about!
				</p>
				<div className="flex flex-col space-y-8">
					<InputWithButton
						color="grain-matcha"
						placeholder="Your email"
						buttonText="Subscribe"></InputWithButton>
					<div className="flex w-full items-center justify-between">
						<ButtonLink
							url="https://teacaps.studio/discord"
							color="grain"
							icon={<DiscordIcon className="w-6" />}>
							Join the Teahouse
						</ButtonLink>
						<SocialLinks exclude={["discord"]} className="text-grain" iconClasses="w-6 h-6" />
					</div>
				</div>
			</div>
		</div>
	);
}

export function Footer() {
	return (
		<div className="h-auto w-full bg-matcha">
			<Container className="flex items-center justify-between py-16">
				<FooterNavigation />
				<SocialsAndUpdates />
			</Container>
		</div>
	);
}

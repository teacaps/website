import { DiscordIcon } from "../../../assets/icons/socials/discord";
import { SocialLinks } from "../SocialLinks";
import { ButtonLink } from "../input/Button";
import { SubscribeForm } from "../input/SubscribeForm.client";

export function SocialsAndUpdates() {
	return (
		<div className="flex w-full flex-col space-y-4 text-grain md:w-2/3 lg:w-1/2">
			<span className="inline text-2xl leading-9 sm:text-3xl">Stay in the know</span>
			<div className="flex flex-col space-y-6">
				<p className="leading-7">
					Sign up for email updates to keep up with releases, or join our wonderful Discord community, the
					Teahouse, to find out what we’re all about!
				</p>
				<div className="flex flex-col space-y-6 sm:space-y-8">
					<SubscribeForm className="text-sm md:text-base" inputProps={{ className: "w-full" }} />
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

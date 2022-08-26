import clsx from "clsx";
import { DiscordIcon } from "../../assets/icons/socials/discord";
import { RedditIcon } from "../../assets/icons/socials/reddit";
import { TwitterIcon } from "../../assets/icons/socials/twitter";
import { InstagramIcon } from "../../assets/icons/socials/instagram";

const socials = [
	[DiscordIcon, "https://discord.gg/K3fgaDrJha"],
	[RedditIcon, "https://www.reddit.com/user/shopteacaps"],
	[TwitterIcon, "https://twitter.com/shopteacaps"],
	[InstagramIcon, "https://www.instagram.com/shopteacaps"],
] as const;

export function SocialLinks({ className }: { className?: string }) {
	return (
		<div className={clsx(className, "flex flex-row")}>
			{socials.map(([Icon, url]) => (
				<a href={url} key={url}>
					<Icon />
				</a>
			))}
		</div>
	);
}

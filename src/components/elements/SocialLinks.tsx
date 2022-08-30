import clsx from "clsx";
import { DiscordIcon } from "../../assets/icons/socials/discord";
import { RedditIcon } from "../../assets/icons/socials/reddit";
import { TwitterIcon } from "../../assets/icons/socials/twitter";
import { InstagramIcon } from "../../assets/icons/socials/instagram";

const socials = {
	discord: [DiscordIcon, "https://discord.gg/K3fgaDrJha"],
	reddit: [RedditIcon, "https://www.reddit.com/user/shopteacaps"],
	twitter: [TwitterIcon, "https://twitter.com/shopteacaps"],
	instagram: [InstagramIcon, "https://www.instagram.com/shopteacaps"],
} as const;

export function SocialLinks({
	className,
	iconClasses,
	exclude = [],
}: {
	className?: string;
	iconClasses?: string;
	exclude: Array<keyof typeof socials>;
}) {
	return (
		<div className={clsx(className, "flex flex-row space-x-4")}>
			{Object.entries(socials)
				// TODO: as -> satisfies in TS 4.9
				.filter(([name]) => !(exclude as Array<string>).includes(name))
				.map(([_key, [Icon, url]]) => (
					<a href={url} key={url}>
						<Icon className={iconClasses} />
					</a>
				))}
		</div>
	);
}

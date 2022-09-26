import { Image } from "@shopify/hydrogen";
import clsx from "clsx";

import { ClockIcon } from "../../assets/icons/clock";
import { Container } from "../elements/Container";
import { ButtonLink } from "../elements/input/Button";

export function ProductSection({
	name,
	description,
	url,
	until,
	align,
	imageDimensions: { width, height },
	interestCheck = false,
}: {
	name: string;
	description?: string;
	url: string;
	until?: string;
	align: "left" | "right";
	imageDimensions: { width: number; height: number };
	interestCheck?: boolean;
}) {
	return (
		<Container
			className={clsx(
				"flex flex-col items-center justify-center py-16 px-0",
				align === "right" ? "sm:flex-row-reverse" : "sm:flex-row",
			)}>
			<Image
				src={`/assets/illustrations/${name.toLowerCase().replace(/\s/g, "-")}.png`}
				className="mb-8 w-full sm:mb-0 sm:w-1/2 sm:basis-1/2"
				width={width}
				height={height}
				alt={`An illustration depicting ${name}`}
			/>
			<div className="basis-1/2 space-y-4">
				<div className="inline-flex space-x-6">
					<h2 className="inline font-normal text-matcha text-3xl leading-none sm:text-4xl sm:leading-10">
						{name}
					</h2>
					{until && (
						<div className="inline-flex items-center justify-center font-normal text-walnut-60 text-lg leading-6">
							<ClockIcon className="h-6" />
							<span className="ml-3">until {until}</span>
						</div>
					)}
				</div>
				{interestCheck ? (
					<h3 className="mt-2 mb-3 text-walnut text-xl leading-8 sm:text-2xl">interest check</h3>
				) : null}
				{description ? <p className="mb-3 text-walnut leading-7 sm:mt-2 sm:text-lg">{description}</p> : null}
				<ButtonLink
					external={interestCheck}
					url={url}
					color={interestCheck ? "matcha" : "walnut"}
					className="sm:text-lg">
					{interestCheck ? "Share your thoughts" : `Shop ${name}`}
				</ButtonLink>
			</div>
		</Container>
	);
}

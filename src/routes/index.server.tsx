import clsx from "clsx";
import { Image } from "@shopify/hydrogen";
import { Layout } from "../components/global/Layout.server";
import { Container } from "../components/elements/Container";
import { Spline } from "../components/elements/SplineWrapper.client";
import { ButtonLink } from "../components/elements/Button";
import { Graphic } from "../assets/graphic";
import { ClockIcon } from "../assets/icons/clock";

function Hero() {
	return (
		<>
			<Container className="mt-24 flex flex-col items-start">
				<h1 className="inline w-3/4 text-4xl font-normal leading-tight text-matcha sm:text-5xl lg:w-1/2">
					For lovers of tea
					<br />
					and keyboards
				</h1>
				<ButtonLink color="walnut" className="mt-8 text-lg leading-none" url="store">
					Shop
				</ButtonLink>
			</Container>
			<Spline
				scene="/spline/scene.splinecode"
				className="md:[60vw] ml-auto mb-24 mt-16 w-[75vw] lg:-mt-16 lg:w-[45vw] xl:-mt-24 2xl:-mt-36 2xl:w-[40vw]"
			/>
		</>
	);
}

function Welcome() {
	return (
		<div className="bg-matcha">
			<Container className="flex flex-col items-center justify-center space-y-8 py-16">
				<div className="w-full text-center text-grain sm:w-2/3">
					<h2 className="mb-6 text-4xl font-normal leading-10">Welcome to the Studio!</h2>
					<p className="text-lg leading-7 sm:text-xl">
						Glad to have you here! We’re a small group of enthusiasts making tea, keycaps, and friends like
						no other. Have a look around!
					</p>
				</div>
				<div className="inline-flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8">
					<ButtonLink color="grain" className="sm:text-lg" url="/about">
						Learn about us
					</ButtonLink>
					<Graphic className="h-5 text-grain" />
				</div>
			</Container>
		</div>
	);
}

function Product({
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
		<Container className={clsx("flex items-center justify-center py-16", align === "right" && "flex-row-reverse")}>
			<Image
				src={`/assets/illustrations/${name.toLowerCase().replace(/\s/g, "-")}.png`}
				className="w-1/2 basis-1/2"
				width={width}
				height={height}
				alt={`An illustration depicting ${name}`}
			/>
			<div className="basis-1/2">
				<div className="inline-flex space-x-6">
					<h2 className="inline text-4xl font-normal leading-10 text-matcha">{name}</h2>
					{until && (
						<div className="inline-flex items-center justify-center text-lg font-normal leading-6 text-walnut-60">
							<ClockIcon className="h-6" />
							<span className="ml-3">until {until}</span>
						</div>
					)}
				</div>
				{interestCheck ? <h3 className="mt-2 mb-3 text-2xl leading-8 text-walnut">interest check</h3> : null}
				{description ? <p className="mt-2 mb-3 text-lg leading-7 text-walnut">{description}</p> : null}
				<ButtonLink
					external={interestCheck}
					url={url}
					color={interestCheck ? "matcha" : "walnut"}
					className="text-lg">
					{interestCheck ? "Share your thoughts" : `Shop ${name}`}
				</ButtonLink>
			</div>
		</Container>
	);
}

function Timeline() {
	return (
		<Container className="flex flex-col items-center justify-center space-y-8 py-16">
			<div className="w-full text-center sm:w-2/3">
				<h2 className="mb-6 text-4xl font-normal leading-10 text-matcha">Looking for our previous sets?</h2>
				<p className="text-lg leading-7 text-walnut sm:text-xl">
					Have a look at the timeline for updates on where your order is!
				</p>
			</div>
			<ButtonLink color="matcha" className="sm:text-lg" icon={<ClockIcon className="h-6" />} url="/timeline">
				To the timeline
			</ButtonLink>
		</Container>
	);
}

export default function Landing() {
	return (
		<Layout>
			<Hero />
			<Welcome />
			<Product
				name="Sencha"
				description="Enjoy a feeling of life and greenery with some natural goodness with TeaPBT Sencha. Handle without care, as the coolness of the Sencha will allow you to enjoy the hot beverage on a humid summer day."
				url=""
				align="left"
				imageDimensions={{ width: 1000, height: 528 }}
				interestCheck={true}
			/>
			<Timeline />
		</Layout>
	);
}

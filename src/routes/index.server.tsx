import clsx from "clsx";
import { Image } from "@shopify/hydrogen";
import { Layout } from "../components/global/Layout.server";
import { Container } from "../components/elements/Container";
import { Spline } from "../components/elements/SplineWrapper.client";
import { ButtonLink } from "../components/elements/input/Button";
import { Graphic } from "../assets/graphic";
import { ClockIcon } from "../assets/icons/clock";

function Hero() {
	return (
		<>
			<Container className="mt-8 flex flex-col items-start sm:mt-24">
				<h1 className="inline w-3/4 font-normal text-matcha text-3xl leading-tight sm:text-4xl sm:text-5xl lg:w-1/2">
					For lovers of tea
					<br />
					and keyboards
				</h1>
				<ButtonLink color="walnut" className="mt-4 leading-none sm:mt-8 sm:text-lg" url="shop">
					Shop
				</ButtonLink>
			</Container>
			<Spline
				scene="/spline/scene.splinecode"
				className="md:[60vw] ml-auto mb-16 mt-10 w-[75vw] sm:mb-24 sm:mt-16 lg:-mt-16 lg:w-[45vw] xl:-mt-24 2xl:-mt-36 2xl:w-[40vw]"
			/>
		</>
	);
}

function Welcome() {
	return (
		<div className="bg-matcha">
			<Container className="flex flex-col items-center justify-center space-y-8 py-10 sm:py-16">
				<div className="w-full text-center text-grain sm:w-2/3">
					<h2 className="mb-6 font-normal text-3xl leading-10 sm:text-4xl">Welcome to the Studio!</h2>
					<p className="text-lg leading-7 sm:text-xl">
						Glad to have you here! We’re a small group of enthusiasts making tea, keycaps, and friends like
						no other. Have a look around!
					</p>
				</div>
				<div className="inline-flex flex-col items-center justify-center space-y-8 sm:flex-row sm:space-y-0 sm:space-x-8">
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

function Timeline() {
	return (
		<Container className="flex flex-col items-center justify-center space-y-8 pb-16 pt-8">
			<div className="w-full text-center sm:w-2/3">
				<h2 className="mb-6 text-matcha text-3xl leading-10 sm:text-4xl">Looking for our previous sets?</h2>
				<p className="text-walnut text-lg leading-7 sm:text-xl">
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
				description="From the rolling hills of Japan comes a set themed after one of our favorite teas - Sencha. With soft green undertones, TeaPBT Sencha embraces the feeling of a warm cup of tea on a cool fall afternoon."
				url="/products/sencha"
				align="left"
				imageDimensions={{ width: 1000, height: 528 }}
			/>
			<Timeline />
		</Layout>
	);
}

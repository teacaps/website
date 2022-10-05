import { ButtonLink } from "../elements/input/Button";
import { Container } from "../global/Container";

export function Hero() {
	return (
		<>
			<Container className="mt-8 flex flex-col items-start sm:mt-24">
				<h1 className="inline w-3/4 font-normal text-matcha text-3xl leading-tight sm:text-4xl lg:w-1/2 lg:text-5xl">
					For lovers of tea
					<br />
					and keyboards
				</h1>
				<ButtonLink color="walnut" className="mt-4 leading-none sm:mt-8 sm:text-lg" url="shop">
					Shop
				</ButtonLink>
			</Container>
			<video
				className="md:[60vw] ml-auto mb-16 mt-10 w-[75vw] sm:mb-24 sm:mt-16 lg:-mt-16 lg:w-[45vw] xl:-mt-24 2xl:-mt-36 2xl:w-[40vw]"
				autoPlay
				loop
				muted
				playsInline>
				{/* https://supergeekery.com/blog/transparent-video-in-chrome-edge-firefox-and-safari-circa-2022 */}
				{/* PNG sequence to ProRes 4444 XQ in After Effects, then convert to H.265 in Shutter Encoder */}
				{/* Really only used to support Safari */}
				<source src="/assets/hero-teacup.mp4" type="video/mp4;codecs=hvc1" />
				{/* PNG sequence to webm with libvpx-vp9 in ffmpeg */}
				{/* Generally universal support aside from Safari */}
				<source src="/assets/hero-teacup.webm" type="video/webm" />
			</video>
		</>
	);
}

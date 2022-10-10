import clsx from "clsx";
import { useLayoutEffect, useRef } from "react";
import { ButtonLink } from "../elements/input/Button";
import { Container } from "../global/Container";

export function Hero() {
	const fallbackImage = useRef<HTMLImageElement>(null);
	const teacupVideo = useRef<HTMLVideoElement>(null);
	const teacup3dClasses =
		"md:[60vw] ml-auto mb-16 mt-10 w-[75vw] sm:mb-24 sm:mt-16 lg:-mt-16 lg:w-[45vw] xl:-mt-24 2xl:-mt-36 2xl:w-[40vw]";
	useLayoutEffect(() => {
		const video = teacupVideo.current;
		if (!video || video.classList.contains("hidden")) return;
		const videoIsPlaying = () => video.currentTime > 0 && video.readyState > 2 && !video.paused && !video.ended;
		const switchToFallback = () => {
			fallbackImage.current?.classList.remove("hidden");
			video.classList.add("hidden");
		};
		if (!videoIsPlaying()) {
			// Safari won't allow autoplay in low power mode, so we fall back to a still image
			video
				.play()
				.then(() => {
					if (!videoIsPlaying()) switchToFallback();
				})
				.catch(switchToFallback);
		}
	});
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
			{/* eslint-disable-next-line hydrogen/prefer-image-component */}
			<img
				alt=""
				src="/assets/hero-fallback.png"
				ref={fallbackImage}
				className={clsx(teacup3dClasses, "hidden")}
			/>
			<video className={teacup3dClasses} autoPlay loop muted playsInline ref={teacupVideo}>
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

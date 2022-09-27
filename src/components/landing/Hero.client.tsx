import { Spline } from "../elements/SplineWrapper.client";
import { ButtonLink } from "../elements/input/Button";
import { Container } from "../global/Container";

export function Hero() {
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

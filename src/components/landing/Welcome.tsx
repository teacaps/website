import { Graphic } from "../../assets/graphic";
import { ButtonLink } from "../elements/input/Button";
import { Container } from "../global/Container";

export function Welcome() {
	return (
		<div className="bg-matcha">
			<Container className="flex flex-col items-center justify-center space-y-8 py-10 sm:py-16">
				<div className="w-full text-center text-grain sm:w-2/3">
					<h2 className="mb-6 font-normal text-2xl leading-10 sm:text-3xl">Welcome to the Studio!</h2>
					<p className="leading-7 md:text-xl">
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

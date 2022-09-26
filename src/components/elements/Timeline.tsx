import { ClockIcon } from "../../assets/icons/clock";
import { Container } from "./Container";
import { ButtonLink } from "./input/Button";

export function Timeline() {
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

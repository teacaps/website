import { Layout } from "../components/global/Layout.server";
import { Container } from "../components/elements/Container";
import { Spline } from "../components/elements/SplineWrapper.client";
import { Button } from "../components/elements/Button";

export default function Landing() {
	return (
		<Layout>
			<div className="">
				<Container className="mt-24">
					<h1 className="font-normal text-4xl sm:text-5xl leading-tight text-matcha w-3/4 lg:w-1/2 inline">
						For lovers of tea
						<br />
						and keyboards
					</h1>
					<Button color="walnut" className="mt-8 text-lg leading-none">
						Shop
					</Button>
				</Container>
				<div>
					<Spline
						scene="/spline/scene.splinecode"
						className="ml-auto mb-24 mt-16 lg:mt-8 xl:mt-0 2xl:-mt-8 w-[75vw] md:[60vw] lg:w-[45vw] 2xl:w-[40vw]"
					/>
				</div>
			</div>
		</Layout>
	);
}

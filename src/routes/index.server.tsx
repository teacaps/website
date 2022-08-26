import { Layout } from "../components/global/Layout.server";
import { Container } from "../components/elements/Container";

export default function Landing() {
	return (
		<Layout>
			<div className="w-full h-2/3-screen">
				<Container>
					<h1 className="font-normal text-4xl text-matcha w-1/3 mt-24">For lovers of tea and keyboards</h1>
				</Container>
			</div>
		</Layout>
	);
}

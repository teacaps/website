import { Layout } from "../components/global/Layout.server";

export default function Home() {
	return (
		<Layout>
			<div className="w-full mt-12">
				<h1 className="font-normal text-4xl text-matcha mb-20">Tea, keycaps, and friends.</h1>
			</div>
		</Layout>
	);
}

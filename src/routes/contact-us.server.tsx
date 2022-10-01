import { Suspense } from "react";
import { ContactForm } from "../components/contact/ContactForm.client";
import { Container } from "../components/global/Container";
import { CustomSeo } from "../components/global/CustomSeo.server";
import { Layout } from "../components/global/Layout.server";

export default function Contact() {
	return (
		<Layout>
			<Suspense>
				<CustomSeo
					type="page"
					data={{
						title: "Contact",
						description:
							"Got a question, comment, or just want to chat with someone about keyboards? Send us a message.",
					}}
				/>
			</Suspense>
			<Container className="mt-16 mb-24 flex flex-col items-center justify-center space-y-6">
				<h1 className="text-center text-matcha trim-both text-2xl md:text-3xl">Get in touch</h1>
				<span className="w-3/5 text-center text-walnut text-lg leading-7">
					Got a question, comment, or just want to chat with someone about keyboards? Send us a message using
					the form below.
				</span>
				<ContactForm />
			</Container>
		</Layout>
	);
}

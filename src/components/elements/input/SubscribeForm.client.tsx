import { useState } from "react";

import { InputWithButton } from "./InputWithButton";
import type { InputWithButtonProps } from "./InputWithButton";

export function FooterSubscribeForm(props: Partial<InputWithButtonProps>) {
	const [buttonText, setButtonText] = useState("Subscribe");
	return (
		<InputWithButton
			name="email"
			action="/api/subscribe"
			color="grain-matcha"
			placeholder="Your email"
			buttonText={buttonText}
			onSubmit={() => {
				setButtonText("Subscribed!");
				setTimeout(() => setButtonText("Subscribe"), 3000);
			}}
			{...props}
		/>
	);
}

export function ProductSubscribeForm(props: Partial<InputWithButtonProps>) {
	const [buttonText, setButtonText] = useState("Subscribe");
	return (
		<InputWithButton
			name="email"
			action="/api/subscribe"
			color="grain-walnut"
			placeholder="Your email"
			buttonText={buttonText}
			onSubmit={() => {
				setButtonText("Subscribed!");
				setTimeout(() => setButtonText("Subscribe"), 3000);
			}}
			{...props}
		/>
	);
}

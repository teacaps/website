import { useState } from "react";
import type { InputWithButtonProps } from "./InputWithButton";
import { InputWithButton } from "./InputWithButton";

export function SubscribeForm(props: Partial<InputWithButtonProps>) {
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

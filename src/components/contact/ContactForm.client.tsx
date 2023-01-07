import { useLocalization } from "@shopify/hydrogen";
import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Button } from "../elements/input/Button";
import { Form } from "../elements/input/Form.client";
import { Input } from "../elements/input/Input";

export function ContactForm() {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const { country } = useLocalization();
	const [buttonText, setButtonText] = useState("Send");
	const [captchaToken, setCaptchaToken] = useState("");

	const handleCaptcha = useCallback(async () => {
		if (!executeRecaptcha) return;
		setCaptchaToken(await executeRecaptcha("CONTACT_FORM"));
	}, [executeRecaptcha]);

	useEffect(() => {
		handleCaptcha();
	}, [handleCaptcha]);

	return (
		<Form
			action="/api/contact"
			method="POST"
			className="flex w-3/5 flex-col items-center space-y-6"
			onSubmit={async () => {
				setButtonText("Sending...");
				setTimeout(() => setButtonText("Sent!"), 1000);
				setTimeout(() => setButtonText("Send"), 3000);
			}}>
			<input type="hidden" name="locale" value={country.isoCode} />
			<input type="hidden" name="g-recaptcha-response" value={captchaToken} />
			<div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-4">
				<div className="sm:col-span-2">
					<label htmlFor="name" className="block pl-2 font-medium text-walnut-80 text-sm">
						Name
					</label>
					<Input
						color="grain"
						textColor="walnut"
						className="mt-3 w-full border-walnut-60"
						type="text"
						name="name"
						id="name"
						autoComplete="name"
						placeholder="James Poppyseed"
						required
					/>
				</div>
				<div className="sm:col-span-2">
					<label htmlFor="email" className="block pl-2 font-medium text-walnut-80 text-sm">
						Email
					</label>
					<Input
						color="grain"
						textColor="walnut"
						className="mt-3 w-full border-walnut-60"
						type="email"
						name="email"
						id="email"
						autoComplete="email"
						placeholder="example@teacaps.studio"
						required
					/>
				</div>
				<div className="sm:col-span-4">
					<label htmlFor="message" className="block pl-2 font-medium text-walnut-80 text-sm">
						Message
					</label>
					<div className="mt-3">
						<textarea
							id="field"
							name="message"
							rows={5}
							className="w-full rounded-3xl border-walnut-60 bg-grain px-5 font-medium text-walnut placeholder:text-pepper-40"
							placeholder="Enter your message"
							required
						/>
					</div>
				</div>
			</div>
			<Button color="walnut" type="submit" value={buttonText} className="border-0 bg-matcha text-grain">
				{buttonText}
			</Button>
		</Form>
	);
}

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import type { ReactNode } from "react";

export function ReCaptcha({ children }: { children: ReactNode }) {
	return (
		<GoogleReCaptchaProvider reCaptchaKey={import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY}>
			{children}
		</GoogleReCaptchaProvider>
	);
}

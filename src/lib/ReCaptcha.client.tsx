import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import type { ReactNode } from "react";

export function ReCaptcha({ children, reCaptchaKey }: { children: ReactNode; reCaptchaKey: string }) {
	return <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>{children}</GoogleReCaptchaProvider>;
}

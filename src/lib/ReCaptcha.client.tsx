import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import type { ReactNode } from "react";

const env: Record<string, string> = typeof Oxygen !== "undefined" && "env" in Oxygen ? Oxygen.env : import.meta.env;

export function ReCaptcha({ children }: { children: ReactNode }) {
	return <GoogleReCaptchaProvider reCaptchaKey={env.PUBLIC_RECAPTCHA_SITE_KEY}>{children}</GoogleReCaptchaProvider>;
}

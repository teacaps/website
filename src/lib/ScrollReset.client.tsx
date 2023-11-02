import { useClientLayoutEffect } from "./utils";

export function ScrollReset() {
	useClientLayoutEffect(() => {
		document.querySelector("#root > div")?.scrollTo({ top: 0, behavior: "smooth" });
	});
	return null;
}

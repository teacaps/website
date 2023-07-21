import { useLayoutEffect } from "react";

export function ScrollReset() {
	useLayoutEffect(() => {
		document.querySelector("#root > div")?.scrollTo({ top: 0, behavior: "smooth" });
	});
	return null;
}

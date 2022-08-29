import { useEffect, useState } from "react";

type Dimensions = { width: number; height: number };
export function useWindowSize(cb: (size: Dimensions) => unknown, dimension: "width" | "height" | "both" = "both") {
	const changeOnWidth = ["width", "both"].includes(dimension);
	const changeOnHeight = ["height", "both"].includes(dimension);

	const [windowSize, setWindowSize] = useState<Dimensions>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		function handleResize() {
			if (
				(changeOnWidth && window.innerWidth !== windowSize.width) ||
				(changeOnHeight && window.innerHeight !== windowSize.height)
			) {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
				cb(windowSize);
			}
		}

		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
}

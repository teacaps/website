import RealSpline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import type { CSSProperties } from "react";

export function Spline(props: Parameters<typeof RealSpline>[0]) {
	const style: CSSProperties = {
		// Override the default `display: "none"` inline style during loading so there's no flicker.
		display: "block",
		pointerEvents: "none",
	};
	return (
		<RealSpline
			style={style}
			{...props}
			onLoad={({ canvas }: Application) => {
				canvas.style.width = "";
				canvas.style.height = "";
			}}
		/>
	);
}

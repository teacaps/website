import RealSpline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

export function Spline(props: Parameters<typeof RealSpline>[0]) {
	return (
		<RealSpline
			// Override the default `display: "none"` inline style during loading so there's no flicker.
			style={{ display: "block" }}
			{...props}
			onLoad={({ canvas }: Application) => {
				canvas.style.width = ``;
				canvas.style.height = ``;
			}}
		/>
	);
}

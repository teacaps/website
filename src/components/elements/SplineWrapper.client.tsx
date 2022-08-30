import RealSpline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

export function Spline(props: Parameters<typeof RealSpline>[0]) {
	return (
		<RealSpline
			// Override the default `display: "none"` inline style during loading so there's no flicker.
			style={{ display: "block" }}
			{...props}
			onLoad={({ canvas }: Application) => {
				canvas.style.width = "";
				canvas.style.height = "";
				// Set the canvas width/height on resize or else events won't trigger.
				const ro = new ResizeObserver(() => {
					const rect = canvas.getBoundingClientRect();
					if (Math.abs(rect.height - canvas.height) < 10) return;
					canvas.width = rect.width;
					canvas.height = rect.height;
				});
				ro.observe(canvas);
			}}
		/>
	);
}

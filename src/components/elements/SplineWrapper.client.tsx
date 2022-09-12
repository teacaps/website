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
				window.addEventListener("resize", () => adjustCanvasSize(canvas));
				const emptyDataURL = canvas.toDataURL();
				const waitForContent = setInterval(() => {
					if (emptyDataURL !== canvas.toDataURL()) {
						clearInterval(waitForContent);
						adjustCanvasSize(canvas);
					}
				}, 500);
			}}
		/>
	);
}

function adjustCanvasSize(canvas: HTMLCanvasElement) {
	const { devicePixelRatio: ratio } = window;
	const { width, height } = canvas.getBoundingClientRect();
	canvas.width = width * ratio;
	canvas.height = height * ratio;
}

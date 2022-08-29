import { Suspense, useEffect, useRef, useState } from "react";
import RealSpline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import { elementClassRuleApplyingAttribute } from "../../lib/styleUtils";
import { useWindowSize } from "../../lib/hooks";

// width * ratio = height
const SPLINE_RATIO = 669 / 1072;
const SplineFallback = () => <canvas></canvas>;

function scaleCanvas(canvas: HTMLCanvasElement, widthStr: string) {
	const [, width = "0", unit = "px"] = widthStr.match(/(\d+)([a-z]+)/) || [];
	canvas!.style.width = `${width}${unit}`;
	canvas!.style.height = `${parseInt(width) * SPLINE_RATIO}${unit}`;
}

export function Spline(props: Parameters<typeof RealSpline>[0]) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [showCanvas, setShowCanvas] = useState(false);
	useEffect(() => {
		setShowCanvas(true);
	}, [showCanvas]);
	useWindowSize(() => {
		if (!canvasRef?.current) return;
		const widthRule = elementClassRuleApplyingAttribute(canvasRef.current, "width");
		scaleCanvas(canvasRef.current, widthRule ? widthRule.style.width : canvasRef.current.style.width);
	});
	return (
		<Suspense fallback={SplineFallback()}>
			{showCanvas ? (
				<RealSpline
					ref={canvasRef}
					{...props}
					onLoad={(e: Application) => {
						if (!showCanvas) setShowCanvas(true);
						if (
							(!e.canvas.width && !e.canvas.height) ||
							(e.canvas.width === 300 && e.canvas.height === 150)
						) {
							const observer = new ResizeObserver(([canvasEntry]) => {
								const { width, height } = canvasEntry.contentRect;
								if (width !== 300 || height !== 150) {
									observer.disconnect();
									const widthRule = elementClassRuleApplyingAttribute(e.canvas, "width");
									scaleCanvas(e.canvas, widthRule ? widthRule.style.width : e.canvas.style.width);
								}
							});
							observer.observe(e.canvas);
						} else {
							const widthRule = elementClassRuleApplyingAttribute(e.canvas, "width");
							scaleCanvas(e.canvas, widthRule ? widthRule.style.width : e.canvas.style.width);
						}
					}}
				/>
			) : (
				<SplineFallback />
			)}
		</Suspense>
	);
}

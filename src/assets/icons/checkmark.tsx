import clsx from "clsx";

export const CheckmarkIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 24 24" className={clsx(className, "fill-current")}>
		<path d="M23.533 4.802 8.802 19.534.471 11.202l1.131-1.131 7.2 7.2 13.6-13.6 1.131 1.131Z" />
	</svg>
);

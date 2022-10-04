import clsx from "clsx";

export const ExpandIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 24 24" className={clsx(className, "fill-current")}>
		<path d="M19.67 3.2h-3.669V1.6h6.401V8h-1.6V4.333l-5.035 5.035-1.131-1.132L19.67 3.2ZM9.366 15.767l-5.034 5.035H8v1.6H1.6v-6.4h1.6v3.669l5.034-5.035 1.131 1.131Z" />
	</svg>
);

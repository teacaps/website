import clsx from "clsx";

export const FilterIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 24 24" className={clsx(className, "fill-current")}>
		<path d="M24 4.8H0V3.2h24v1.6Zm-4.8 8H4.8v-1.6h14.4v1.6Zm-3.2 8H8v-1.6h8v1.6Z" />
	</svg>
);

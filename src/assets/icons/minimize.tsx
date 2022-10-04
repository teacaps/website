import clsx from "clsx";

export const MinimizeIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 24 24" className={clsx(className, "fill-current")}>
		<path d="m22.168 2.966-5.035 5.035h3.669v1.6h-6.4v-6.4h1.6v3.668l5.034-5.034 1.132 1.131ZM3.2 14.402h6.4v6.4H8v-3.669l-5.034 5.035-1.132-1.132 5.035-5.034H3.2v-1.6Z" />
	</svg>
);

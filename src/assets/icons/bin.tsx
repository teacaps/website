import clsx from "clsx";

export const BinIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 24 24" className={clsx(className, "fill-current")}>
		<path d="M8.8 1.55a.85.85 0 0 0-.85.85v2.4h-1.5V2.4A2.35 2.35 0 0 1 8.8.05h6.4a2.35 2.35 0 0 1 2.35 2.35v2.4h-1.5V2.4a.85.85 0 0 0-.85-.85H8.8Zm-7.15 4.8H0v-1.5h24v1.5h-1.65V21.6A2.35 2.35 0 0 1 20 23.95H4a2.35 2.35 0 0 1-2.35-2.35V6.35Zm1.5 0V21.6c0 .47.38.85.85.85h16c.47 0 .85-.38.85-.85V6.35H3.15Zm8.1 12.85v-8h1.5v8h-1.5Zm-4.8 0v-4.8h1.5v4.8h-1.5Zm9.6 0v-4.8h1.5v4.8h-1.5Z" />
	</svg>
);

import clsx from "clsx";

export const GarageFillIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 24 24" className={clsx(className, "fill-current")}>
		<path d="M11.535.149a.8.8 0 0 1 .93 0l11.2 8A.8.8 0 0 1 24 8.8v14.4a.8.8 0 0 1-.8.8h-2.4V11.2H3.2V24H.8a.8.8 0 0 1-.8-.8V8.8a.8.8 0 0 1 .335-.651l11.2-8Z" />
		<path d="M4.8 24h14.4v-6.4H4.8V24Zm9.6-3.2H9.6v-1.6h4.8v1.6Z" />
		<path d="M19.2 16v-3.2H4.8V16h14.4Z" />
	</svg>
);

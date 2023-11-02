import clsx from "clsx";

export const PrintFillIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 24 24" className={clsx(className, "fill-current")}>
		<path d="M4.8 2.4A2.4 2.4 0 0 1 7.2 0h9.6a2.4 2.4 0 0 1 2.4 2.4V8H4.8V2.4ZM2.4 9.6A2.4 2.4 0 0 0 0 12v6.4a2.4 2.4 0 0 0 2.4 2.4h.8v-6.4h17.6v6.4h.8a2.4 2.4 0 0 0 2.4-2.4V12a2.4 2.4 0 0 0-2.4-2.4H2.4Z" />
		<path d="M4.8 16h14.4v8H4.8v-8Z" />
	</svg>
);

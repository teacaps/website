import clsx from "clsx";

export const ExternalIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 24 24" className={clsx(className, "fill-current")}>
		<path d="M12.801 1.6h9.601v9.601h-1.6V4.332L2.966 22.168l-1.132-1.132L19.67 3.2h-6.869V1.6Z" />
	</svg>
);

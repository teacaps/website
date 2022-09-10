import clsx from "clsx";

export const ShopFillIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 24 24" className={clsx(className, "fill-current")}>
		<path d="M22.4 1.6H1.6V0h20.8v1.6ZM1.616 3.843A.8.8 0 0 1 2.4 3.2h19.2a.8.8 0 0 1 .784.643l1.6 8a.8.8 0 0 1-.784.957H.8a.8.8 0 0 1-.784-.957l1.6-8ZM1.6 14.4v8H0V24h24v-1.6h-1.6v-8h-3.2v3.2H4.8v-3.2H1.6Z" />
		<path d="M6.4 14.4h11.2V16H6.4v-1.6Z" />
	</svg>
);

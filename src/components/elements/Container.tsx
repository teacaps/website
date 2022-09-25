import type { DetailedHTMLProps, HTMLAttributes } from "react";
import clsx from "clsx";

export type ContainerProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export function Container({ children, className, ...props }: ContainerProps) {
	return (
		<div className={clsx("mx-auto w-full px-8 sm:w-4/5 lg:px-16 xl:max-w-screen-xl", className)} {...props}>
			{children}
		</div>
	);
}

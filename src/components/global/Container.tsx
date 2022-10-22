import clsx from "clsx";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export type ContainerProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export function Container({ children, className, ...props }: ContainerProps) {
	return (
		<div className={clsx("px-8 sm:mx-auto sm:w-4/5 sm:px-12 lg:px-16 xl:max-w-screen-xl", className)} {...props}>
			{children}
		</div>
	);
}

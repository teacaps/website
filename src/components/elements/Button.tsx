import { Color } from "../lib/styleUtils";
import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	color: Color;
	disabled?: boolean;
	icon?: ReactNode | undefined | null;
	className?: string;
	children: string;
}
export function Button({ color: baseColor, disabled, icon, className, children, ...props }: ButtonProps) {
	const color = disabled ? `${baseColor}-${baseColor === "grain" ? 40 : 60}}` : `${baseColor}`;
	return (
		<button
			className={clsx(
				`border-2 border-${color} text-${color}`,
				`hover:border-0 hover:bg-${color} hover:text-${baseColor === "grain" ? "matcha" : "grain"}`,
				`font-medium rounded-full h-12 px-5 flex items-center justify-center space-x-3`,
				className,
			)}
			disabled={disabled}
			{...props}>
			{children}
			{icon || null}
		</button>
	);
}

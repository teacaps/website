import clsx from "clsx";
import { HTMLAttributes } from "react";
import { Color } from "../../lib/utils";

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
	color: Exclude<Color, "pepper">;
	disabled?: boolean;
}
export function Input({ color, disabled, className, ...props }: InputProps) {
	const placeholderColor = color === "grain" ? "pepper-40" : `${color}-60`;
	const textColor = color === "grain" ? "matcha" : "grain";
	const disabledTextColor = {
		matcha: "matcha-80",
		grain: "walnut-60",
		walnut: "walnut-40",
	}[color];
	const disabledBackgroundColor = {
		matcha: "matcha",
		grain: "walnut-40",
		walnut: "walnut-60",
	}[color];
	return (
		<input
			className={clsx(
				`bg-${color} text-${textColor}`,
				`placeholder:text-${placeholderColor}`,
				`flex h-12 items-center justify-center gap-3 rounded-full px-5 text-base font-medium`,
				disabled && `bg-${disabledBackgroundColor} text-${disabledTextColor}`,
				className,
			)}
			disabled={disabled}
			{...props}
		/>
	);
}

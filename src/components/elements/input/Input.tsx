import clsx from "clsx";
import type { Color } from "../../../lib/utils";
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<any> {
	color: Exclude<Color, "pepper">;
	textColor?: Exclude<Color, "pepper">;
	disabled?: boolean;
}
export function Input({ color, textColor, disabled, className, ...props }: InputProps) {
	const placeholderColor = color === "grain" ? "pepper-40" : `${color}-60`;
	textColor ??= color === "grain" ? "matcha" : "grain";
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
				`flex h-10 min-w-0 items-center justify-center rounded-full px-5 font-medium md:h-12`,
				disabled && `bg-${disabledBackgroundColor} text-${disabledTextColor}`,
				className,
			)}
			disabled={disabled}
			{...props}
		/>
	);
}

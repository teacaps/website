import type { FormEventHandler } from "react";
import { Input, InputProps } from "./Input";
import type { ButtonProps } from "./Button";
import clsx from "clsx";

export interface InputWithButtonProps {
	color: "matcha" | "grain-matcha" | "grain-walnut" | "walnut";
	placeholder: string;
	buttonText: string;
	className?: string;
	disabled?: boolean;
	onSubmit?: FormEventHandler<HTMLFormElement> | undefined;
	inputProps?: InputProps;
	buttonProps?: ButtonProps;
}
export function InputWithButton({
	color,
	placeholder,
	buttonText,
	disabled,
	className,
	onSubmit,
	inputProps,
	buttonProps,
}: InputWithButtonProps) {
	const inputColor = color === "grain-matcha" ? "grain" : color === "grain-walnut" ? "grain" : color;
	const buttonColor = color === "grain-matcha" ? "matcha" : color === "grain-walnut" ? "walnut" : "grain";
	const borderColor = color === "grain-walnut" ? "walnut" : inputColor;
	return (
		<form onSubmit={onSubmit} className={clsx("inline-flex", className)}>
			<Input
				color={inputColor}
				className={`rounded-r-none border-2 border-${borderColor} flex-grow`}
				{...inputProps}
				disabled={disabled}
				placeholder={placeholder}
			/>
			<button
				className={clsx(
					`border-2 border-${borderColor} text-${inputColor}`,
					`hover:bg-${inputColor} hover:text-${buttonColor}`,
					`flex h-12 items-center justify-center rounded-r-full px-5 text-base font-medium`,
					className,
				)}
				type="submit"
				disabled={disabled}
				{...buttonProps}>
				{buttonText}
			</button>
		</form>
	);
}
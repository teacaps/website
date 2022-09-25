import type { FormEventHandler } from "react";
import clsx from "clsx";
import { Input, InputProps } from "./Input";
import type { ButtonProps } from "./Button";

export interface InputWithButtonProps {
	color: "matcha" | "grain-matcha" | "grain-walnut" | "walnut";
	placeholder: string;
	buttonText: string;
	className?: string;
	disabled?: boolean;
	onSubmit?: FormEventHandler<HTMLFormElement> | undefined;
	inputProps?: Partial<InputProps>;
	buttonProps?: Partial<ButtonProps>;
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
	const { className: inputClassName, ...inputRest } = inputProps ?? {};
	const { className: buttonClassName, ...buttonRest } = buttonProps ?? {};
	return (
		<form onSubmit={onSubmit} className={clsx("inline-flex", className)}>
			<Input
				color={inputColor}
				className={clsx(
					`rounded-r-none border-2 border-${borderColor} flex-auto overflow-clip`,
					inputClassName,
				)}
				{...inputRest}
				disabled={disabled}
				placeholder={placeholder}
			/>
			<button
				className={clsx(
					`border-2 border-${borderColor} border-l-0 text-${inputColor} bg-${buttonColor}`,
					`hover:bg-${inputColor} hover:text-${buttonColor}`,
					`flex h-10 items-center justify-center rounded-r-full px-5 font-medium md:h-12`,
					buttonClassName,
				)}
				type="submit"
				disabled={disabled}
				{...buttonRest}>
				{buttonText}
			</button>
		</form>
	);
}

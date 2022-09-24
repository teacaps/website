import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Link } from "@shopify/hydrogen";
import type { Color, MakePropertiesOptional } from "../../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	color: Color;
	disabled?: boolean;
	icon?: ReactNode | undefined | null;
	type?: "button" | "submit" | "reset";
}
export function Button({
	color: baseColor,
	disabled,
	icon,
	type = "button",
	className,
	children,
	...props
}: ButtonProps) {
	const color = disabled ? `${baseColor}-${baseColor === "grain" ? 40 : 60}` : `${baseColor}`;
	return (
		<button
			className={clsx(
				`border-2 border-${color} text-${color}`,
				`hover:bg-${color} hover:text-${baseColor === "grain" ? "matcha" : "grain"}`,
				`flex h-12 w-fit items-center justify-center gap-3 rounded-full px-5 font-medium text-base`,
				className,
			)}
			type={type}
			disabled={disabled}
			{...props}>
			{children}
			{icon || null}
		</button>
	);
}

export function UnstyledButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={clsx(
				"border-0 border-none bg-transparent p-0 outline-none hover:font-medium active:font-bold disabled:font-bold",
				className,
			)}
			{...props}>
			{children}
		</button>
	);
}

export interface ButtonLinkProps<External extends boolean> extends Pick<ButtonProps, "color" | "icon"> {
	url: string;
	external?: External;
}
export function ButtonLink<
	T extends boolean,
	PassthroughProps extends T extends true
		? HTMLAttributes<HTMLAnchorElement>
		: Parameters<typeof Link>[0] = T extends true ? HTMLAttributes<HTMLAnchorElement> : Parameters<typeof Link>[0],
>({
	color,
	icon,
	url,
	external,
	className,
	children,
	...props
}: MakePropertiesOptional<ButtonLinkProps<T> & PassthroughProps, "to">) {
	const LinkElement = external ? "a" : Link;
	return (
		<LinkElement
			className={clsx(
				`border-2 border-${color} text-${color}`,
				`hover:bg-${color} hover:text-${color === "grain" ? "matcha" : "grain"}`,
				`inline-flex h-12 items-center justify-center gap-3 rounded-full px-5 font-medium`,
				className?.includes("w-") ? "" : "w-fit",
				className,
			)}
			href={external ? url : undefined}
			to={url}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			{...props}>
			{children}
			{icon || null}
		</LinkElement>
	);
}

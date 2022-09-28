import { Form as HydrogenForm } from "@shopify/hydrogen/experimental";
import type { HTMLAttributes, ReactNode } from "react";

// The default Form type omits native <form> attributes and bizarrely requires multiple children
export type FormProps = Omit<Parameters<typeof HydrogenForm>[0], "children"> & {
	children: ReactNode;
} & HTMLAttributes<HTMLFormElement>;
export function Form({ children, ...props }: FormProps) {
	return (
		<HydrogenForm {...props}>
			{/* @ts-ignore */}
			{children}
		</HydrogenForm>
	);
}

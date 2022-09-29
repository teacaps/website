export type Color = "matcha" | "walnut" | "pepper" | "grain";
export type MakePropertiesOptional<T, K extends string> = T extends T
	? Omit<T, K> & Partial<Pick<T, K extends keyof T ? K : never>>
	: never;
export function isKeyof<T extends object>(obj: T, key: PropertyKey): key is keyof T {
	return key in obj;
}

import { useEffect, useLayoutEffect } from "react";

export type Color = "matcha" | "walnut" | "pepper" | "grain";
export type MakePropertiesOptional<T, K extends string> = T extends T
	? Omit<T, K> & Partial<Pick<T, K extends keyof T ? K : never>>
	: never;
export const useClientLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

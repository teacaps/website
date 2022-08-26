export type Color = "matcha" | "walnut" | "pepper" | "grain";
export type BackgroundColor = `bg-${Color}${`-${20 | 40 | 60 | 80}` | ""}`;
export type TextColor = `text-${Color}${`-${20 | 40 | 60 | 80}` | ""}`;

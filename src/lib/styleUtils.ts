export type Color = "matcha" | "walnut" | "pepper" | "grain";
export type BackgroundColor = `bg-${Color}${`-${20 | 40 | 60 | 80}` | ""}`;
export type TextColor = `text-${Color}${`-${20 | 40 | 60 | 80}` | ""}`;

export function elementClassRuleApplyingAttribute(
	element: HTMLElement,
	attribute: keyof CSSStyleDeclaration,
): CSSStyleRule | null {
	let ruleApplyingAttribute = null;
	const isMatchingStyleRule = (rule: CSSRule) => {
		if (rule instanceof CSSMediaRule) {
			if (!window.matchMedia(rule.conditionText).matches) return;
			const matchingNestedStyleRule = Array.from(rule.cssRules).find(isMatchingStyleRule);
			if (matchingNestedStyleRule && matchingNestedStyleRule instanceof CSSStyleRule) {
				ruleApplyingAttribute = matchingNestedStyleRule;
			}
		} else if (rule instanceof CSSStyleRule) {
			if (!element.matches(rule.selectorText)) return;
			if (
				rule.style[attribute] &&
				Array.from(element.classList).some((className) => rule.selectorText.includes(CSS.escape(className)))
			)
				ruleApplyingAttribute = rule;
		}
	};
	Array.from(document.styleSheets)
		.flatMap((sheet) => Array.from(sheet.cssRules))
		.forEach(isMatchingStyleRule);
	return ruleApplyingAttribute;
}

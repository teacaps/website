/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.tsx"],
	theme: {
		fontFamily: {},
		fontWeight: {
			normal: 400,
			medium: 500,
			bold: 700,
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			matcha: {
				DEFAULT: "#00473A",
				80: "#336C61",
				60: "#669189",
				40: "#99B5B0",
				20: "#CCDAD8",
			},
			pepper: {
				DEFAULT: "#0D170F",
				80: "#3D453F",
				60: "#6E746F",
				40: "#9EA29F",
				20: "#CFD1CF",
			},
			walnut: {
				DEFAULT: "#42312B",
				80: "#685A55",
				60: "#8E8380",
				40: "#B4ADAA",
				20: "#D9D6D5",
			},
			grain: "#EFE3D7",
		},
	},
	safelist: [
		{
			pattern: /[a-zA-Z]+-(matcha|pepper|walnut|grain)(-[0-9]+)*/,
			variants: ["hover", "focus", "active", "disabled"],
		},
	],
	plugins: [require("@tailwindcss/typography")],
};

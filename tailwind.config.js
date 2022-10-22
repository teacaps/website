/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.tsx"],
	theme: {
		fontFamily: {
			"sweet-sans": ["Sweet Sans Pro", "system-ui", "sans-serif"],
		},
		fontMetrics: {
			"Sweet Sans Pro": {
				capHeight: 653,
				ascent: 770,
				descent: -230,
				unitsPerEm: 1000,
			},
		},
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
		// This needs to be specified manually, not in `extends`, or else `xs` will be sorted after `2xl and therefore
		// take precedence in the generated CSS file.
		screens: {
			"xs": "385px",
			"sm": "640px",
			"md": "768px",
			"lg": "1024px",
			"xl": "1280px",
			"2xl": "1536px",
			"tall": { raw: "(min-height: 900px)" },
		},
		extend: {
			spacing: {
				unset: "unset",
			},
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						"--tw-prose-body": theme("colors.walnut.DEFAULT"),
						"--tw-prose-headings": theme("colors.matcha.DEFAULT"),
						"--tw-prose-lead": theme("colors.matcha.DEFAULT"),
						"--tw-prose-links": theme("colors.matcha.DEFAULT"),
						"--tw-prose-bullets": theme("colors.matcha.DEFAULT"),
						"h4": {
							// prose-h4:leading-10
							"lineHeight": "2.5rem",
							"--leading-offset": "calc((2.5rem - 1em) / -2)",
						},
					},
				},
			}),
		},
	},
	safelist: [
		{
			pattern: /[a-zA-Z]+-(matcha|pepper|walnut|grain)(-[0-9]+)*/,
			variants: ["hover", "focus", "active", "disabled"],
		},
	],
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/line-clamp"),
		require("tailwindcss-leading-trim"),
	],
};

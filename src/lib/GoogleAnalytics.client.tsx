import { ClientAnalytics, loadScript } from "@shopify/hydrogen";
import { useEffect, useState } from "react";

const TRACKING_ID = "G-1K3JSGWVE9";
const URL = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`;
let init = false;

export function GoogleAnalytics() {
	useEffect(() => {
		try {
			if (!init) {
				init = true;

				loadScript(URL).catch(() => {});

				window.dataLayer ??= [];
				window.gtag ??= function gtag(...args) {
					window.dataLayer.push(args);
				} as Gtag.Gtag;

				window.gtag("js", new Date());
				window.gtag("config", TRACKING_ID, {
					send_page_view: false,
				});

				const pageView = () => gtag("event", "page_view");
				ClientAnalytics.subscribe(ClientAnalytics.eventNames.PAGE_VIEW, pageView);
				ClientAnalytics.hasSentFirstPageView() && pageView();
			}
		} catch (e) {
			/**/
		}
	});

	return null;
}

// Modified from sampennington/react-scroll-tracker
// ISC License
// Copyright (c) 2022 sam pennington
//
// Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
export function ScrollTracker({
	event_category = "Scroll Depth",
	event_label,
}: {
	event_category?: string;
	event_label?: string;
}) {
	const [state, setState] = useState({
		scrollDepths: [20, 40, 60, 80, 100],
		scrollY: 0,
	});

	const { scrollDepths, scrollY } = state;

	useEffect(() => {
		if (typeof window === "undefined" || window.scrollY === 0) {
			return;
		}
		setState((oldState) => ({
			...oldState,
			scrollY: window.scrollY,
		}));
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const endScrollTracker = () => window.removeEventListener("scroll", handleScroll);

		const handleScroll = () => {
			const h = document.documentElement;
			const b = document.body;

			const scrollTop = h.scrollTop || b.scrollTop;
			const scrollHeight = h.scrollHeight || b.scrollHeight;
			const clientHeight = h.clientHeight;

			const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

			if (scrollDepths) {
				const nextMinDepth = Math.min(...scrollDepths, scrollHeight);

				if (scrollPercent >= nextMinDepth) {
					const updatedScrollDepths = scrollDepths.filter((depth) => depth !== nextMinDepth);

					if (updatedScrollDepths.length === 0) {
						endScrollTracker();
					}

					window.gtag("event", "Scroll", {
						event_category,
						event_label: event_label ?? window.location.pathname,
						value: nextMinDepth,
					});
					setState({
						scrollY: nextMinDepth,
						scrollDepths: updatedScrollDepths,
					});
				}
			} else {
				setState({ ...state, scrollY: scrollPercent });
			}
		};

		window.addEventListener("scroll", handleScroll);

		return endScrollTracker;
	}, [scrollDepths, scrollY, state]);

	return null;
}

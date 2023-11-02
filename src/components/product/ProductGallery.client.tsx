import clsx from "clsx";
import ImageGallery, { type ReactImageGalleryItem } from "react-image-gallery";
import { ExpandIcon } from "../../assets/icons/expand";
import { MinimizeIcon } from "../../assets/icons/minimize";
import { PrintFillIcon } from "../../assets/icons/print-fill";
import { MediaContentType } from "../../graphql/storefront.generated";
import type { MediaFragment, MediaImage } from "../../graphql/storefront.generated";
import type { RefObject } from "react";

interface ProductGalleryProps {
	media: Array<MediaFragment>;
	galleryRef: RefObject<ImageGallery>;
}

const RenderBadge = () => (
	<button
		className="group absolute top-4 left-4 z-10 flex gap-2 rounded-full border border-matcha bg-grain px-5 py-2 font-medium text-matcha text-xs hover:cursor-help hover:bg-matcha-20"
		onClick={() => {
			const qualityDisclaimer = document.querySelector("#quality-disclaimer");
			if (!qualityDisclaimer) return;
			qualityDisclaimer.classList.remove("text-walnut-80", "border-transparent");
			qualityDisclaimer.classList.add("text-matcha", "bg-matcha-20", "border-matcha-20");
			qualityDisclaimer.scrollIntoView({ behavior: "smooth" });
			setTimeout(() => {
				qualityDisclaimer.classList.add("text-walnut-80", "border-transparent");
				qualityDisclaimer.classList.remove("text-matcha", "bg-matcha-20", "border-matcha-20");
			}, 2000);
		}}>
		<PrintFillIcon className="h-4" />
		<span className="mt-0.5">Render</span>
	</button>
);

export function ProductGallery({ media, galleryRef }: ProductGalleryProps) {
	const items = media
		.filter((item): item is MediaImage => item.mediaContentType === MediaContentType.Image)
		.map<ReactImageGalleryItem>(({ image, previewImage }) => ({
			original: image?.url,
			originalHeight: image?.height || undefined,
			originalWidth: image?.width || undefined,
			originalAlt: image?.altText || undefined,
			thumbnail: previewImage?.url,
			thumbnailHeight: previewImage?.height || undefined,
			thumbnailWidth: previewImage?.width || undefined,
			thumbnailAlt: previewImage?.altText || undefined,
		}));
	const currentImageIsRender = items[galleryRef.current?.getCurrentIndex() ?? -1]?.originalAlt?.startsWith("RENDER:");
	return (
		<div className="relative h-fit w-full md:mt-16">
			{currentImageIsRender ? <RenderBadge /> : null}
			<ImageGallery
				ref={galleryRef}
				items={items}
				lazyLoad={true}
				showNav={false}
				showPlayButton={false}
				renderFullscreenButton={(onClick, isFullscreen) => {
					const FullscreenIcon = isFullscreen ? MinimizeIcon : ExpandIcon;
					return (
						<button
							type="button"
							className={clsx(
								"z-4 group absolute rounded-full bg-grain p-2",
								isFullscreen ? "right-8 bottom-8" : "right-4 bottom-4",
							)}
							onClick={onClick}
							aria-label="Toggle fullscreen">
							<FullscreenIcon className="h-4 text-matcha transition-all group-hover:h-5" />
						</button>
					);
				}}
			/>
		</div>
	);
}

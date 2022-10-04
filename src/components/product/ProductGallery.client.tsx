import clsx from "clsx";
import ImageGallery, { type ReactImageGalleryItem } from "react-image-gallery";
import { ExpandIcon } from "../../assets/icons/expand";
import { MinimizeIcon } from "../../assets/icons/minimize";
import { MediaContentType } from "../../graphql/storefront.generated";
import type { MediaFragment, MediaImage } from "../../graphql/storefront.generated";
import type { RefObject } from "react";

interface ProductGalleryProps {
	media: Array<MediaFragment>;
	galleryRef: RefObject<ImageGallery>;
}

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
	return (
		<div className="h-full w-full md:sticky md:top-0 md:-mt-16 md:w-2/5">
			<div className="h-fit w-full md:sticky md:mt-16">
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
		</div>
	);
}

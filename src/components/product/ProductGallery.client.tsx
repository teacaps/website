import ImageGallery, { type ReactImageGalleryItem } from "react-image-gallery";
import type { LegacyRef } from "react";
import type { MediaFragment, MediaImage } from "../../graphql/generated";
import { MediaContentType } from "../../graphql/generated";

interface ProductGalleryProps {
	media: Array<MediaFragment>;
	galleryRef: LegacyRef<ImageGallery>;
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
		<div className="sticky top-0 -mt-16 h-full w-2/5">
			<div className="sticky mt-16 h-fit w-full">
				<ImageGallery
					ref={galleryRef}
					items={items}
					lazyLoad={true}
					showNav={false}
					showFullscreenButton={false}
					showPlayButton={false}></ImageGallery>
			</div>
		</div>
	);
}

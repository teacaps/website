import ImageGallery, { type ReactImageGalleryItem } from "react-image-gallery";
import { MediaContentType } from "../../graphql/storefront.generated";
import type { MediaFragment, MediaImage } from "../../graphql/storefront.generated";
import type { LegacyRef } from "react";


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
		<div className="h-full w-full md:sticky md:top-0 md:-mt-16 md:w-2/5">
			<div className="h-fit w-full md:sticky md:mt-16">
				<ImageGallery
					ref={galleryRef}
					items={items}
					lazyLoad={true}
					showNav={false}
					showFullscreenButton={false}
					showPlayButton={false}
				/>
			</div>
		</div>
	);
}

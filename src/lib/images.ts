import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import type { Img } from "~/components/portfolio/Scene";

/**
 * Resize a source image to the given widths, for an `<img srcset>` in a React visual. The fallback
 * `src` is the largest of them rather than the original. Photos go to WebP; artwork with few
 * colours (a logo) is smaller as a palette PNG.
 */
export const responsive = async (src: ImageMetadata, widths: number[], format: "webp" | "png" = "webp"): Promise<Img> => {
    const fitting = widths.filter((w) => w <= src.width);
    const width = Math.max(...fitting);
    const image = await getImage({ src, width, widths: fitting, format, quality: 78 });
    return { src: image.src, srcSet: image.srcSet.attribute, width: src.width, height: src.height };
};

import type { Locale } from "~/config/routes";
import { responsive } from "~/lib/images";
import type { KaeliImages } from "./kaeli/Kaeli";
import type { StudioTeiImages } from "./studio-tei-29/StudioTei";

import kaeliEmail from "~/assets/portfolio/kaeli/email.svg?url";
import kaeliHeadlineEn from "~/assets/portfolio/kaeli/headline-en.svg?url";
import kaeliHeadlineRo from "~/assets/portfolio/kaeli/headline-ro.svg?url";
import kaeliLogo from "~/assets/portfolio/kaeli/logo.png";
import teiDetails from "~/assets/portfolio/studio-tei-29/details.jpg";
import teiEntrance from "~/assets/portfolio/studio-tei-29/entrance.jpg";
import teiHero from "~/assets/portfolio/studio-tei-29/hero.jpg";
import teiInstructors from "~/assets/portfolio/studio-tei-29/instructors.jpg";
import teiLogoLight from "~/assets/portfolio/studio-tei-29/logo-light.svg?url";
import teiLogo from "~/assets/portfolio/studio-tei-29/logo.svg?url";
import teiStudio from "~/assets/portfolio/studio-tei-29/studio.jpg";
import teiTitle from "~/assets/portfolio/studio-tei-29/title.svg?url";

/** Photos resized at build time; the React visuals only receive URLs. */

export const studioTeiImages = async (): Promise<StudioTeiImages> => ({
    hero: await responsive(teiHero, [480, 800, 1200, 1600]),
    studio: await responsive(teiStudio, [480, 720, 960, 1248]),
    instructors: await responsive(teiInstructors, [360, 540, 720, 960]),
    details: await responsive(teiDetails, [360, 540, 720, 960]),
    entrance: await responsive(teiEntrance, [480, 720, 960, 1536]),
    logo: teiLogo,
    logoLight: teiLogoLight,
    title: teiTitle,
});

export const kaeliImages = async (lang: Locale): Promise<KaeliImages> => ({
    logo: await responsive(kaeliLogo, [180, 360], "png"),
    headline: lang === "ro" ? kaeliHeadlineRo : kaeliHeadlineEn,
    email: kaeliEmail,
});

import { site } from "~/config/site";

/** Operator identification for the legal pages, built from whatever company details are configured. */
export const operator = () => {
    const { legalName, vatId, registryNumber } = site.company;
    const { street, city, region, postalCode } = site.address;
    const address = [street, city, region, postalCode].filter(Boolean).join(", ");
    return {
        name: legalName || site.name,
        vatId,
        registryNumber,
        address,
        email: site.email,
        phone: site.phone,
        domain: new URL(site.url).hostname,
    };
};

# Google Tag Manager

The site loads one Google Tag Manager container, identified by the `PUBLIC_GTM_ID` environment variable. Everything else (GA4, Meta Pixel, Google Ads, …) is configured inside GTM. Without the variable no tracking code, no cookie popup and no "Cookie settings" link ship.

## Consent

Consent Mode v2 is set up inline, before GTM loads (`src/components/analytics/GtmHead.astro`):

| Popup category | Consent Mode types | Default |
| --- | --- | --- |
| Strictly necessary | `functionality_storage`, `security_storage` | granted |
| Analytics | `analytics_storage` | denied |
| Marketing | `ad_storage`, `ad_user_data`, `ad_personalization`, `personalization_storage` | denied |

The choice is kept in `localStorage` under `cookie-consent` for 12 months and re-applied before GTM loads, so tags never wait for the popup. When the visitor decides, the popup calls `gtag('consent', 'update', …)`, deletes the cookies of any declined category and pushes a `consent_update` event. Tags that must fire as soon as consent arrives (the Google tag, pixel base codes) trigger on that event with "Once per page".

Every tag in the recipe below also has **Require additional consent: `analytics_storage`**, so nothing is sent to Google before consent (Consent Mode "basic"). To allow cookieless pings for conversion modelling instead ("advanced"), remove that requirement from the tags; the built-in consent checks still keep cookies off until consent.

## Import the recipe

`container.json` is a container export with a GA4 Google tag and one GA4 event tag per dataLayer event, all gated on consent.

1. GTM → **Admin → Import Container**, choose `gtm/container.json`.
2. Pick your workspace, **Merge**, **Rename conflicting tags, triggers and variables**.
3. Check the `const - GA4 Measurement ID` variable (currently `G-M6HWBY0ZB3`).
4. **Preview** on the site, then **Submit**.
5. In GA4, mark `generate_lead` as a key event and register the custom dimensions you want to report on (`link_location`, `contact_method`, `interests`, `page_language`, …).

## Events pushed by the site

Every event is a **Custom Event** trigger in GTM. `page_language` (`ro`/`en`) and `page_type` (schema.org type) are pushed before GTM loads and sent with every GA4 hit.

| Event | When | Parameters |
| --- | --- | --- |
| `consent_update` | Visitor saves a cookie choice | `consent_analytics`, `consent_marketing` (`granted`/`denied`) |
| `cta_click` | Click on a pill button link (`.btn`) | `link_text`, `link_url`, `link_location` |
| `contact_click` | Click on an email, phone or WhatsApp link | `contact_method` (`email`/`phone`/`whatsapp`), `link_text`, `link_location` |
| `outbound_click` | Click on a link to another domain | `link_url`, `link_domain`, `link_text`, `link_location` |
| `form_start` | First keystroke in the contact form | `form_id` |
| `generate_lead` | Contact form sent successfully (before the redirect) | `form_id`, `interests` |
| `form_error` | Contact form failed to send | `form_id`, `error_code` |
| `faq_open` | An FAQ answer is expanded | `faq_question` |
| `language_switch` | Language toggle clicked | `language_to`, `link_text`, `link_location` |

`link_location` is the id or heading id of the nearest landmark (`header`, `cta-title`, `mobile-menu`, …). Scroll depth (25/50/75/90 %) comes from GTM's built-in trigger, no site code involved.

To track a new element declaratively, add `data-track="event_name"`; any `data-track-foo-bar="x"` attribute becomes the parameter `foo_bar`. From scripts, import `track` from `~/lib/analytics`.

## Adding a marketing tag

For a pixel base code (Meta, TikTok, Google Ads remarketing): trigger on **Initialization - All Pages** and **CE - consent_update**, set **Once per page**, and require **additional consent `ad_storage`** (and `ad_user_data` for Meta/Google Ads). For conversions, fire on `CE - generate_lead` or `CE - contact_click` with the same consent requirement. Then list the platform in the Marketing category of the privacy policy (`src/views/legal/Privacy*.astro`) if it is not already there.

## Testing

- Reset the popup: `localStorage.removeItem('cookie-consent')` in the console, reload.
- Watch events: `dataLayer` in the console, or GTM **Preview** (Tag Assistant). Blocked tags show the consent reason.

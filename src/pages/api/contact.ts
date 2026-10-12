import type { APIRoute } from "astro";
import { CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, RESEND_API_KEY } from "astro:env/server";
import { path, type Locale } from "~/config/routes";
import { site } from "~/config/site";

// The only server-rendered route: runs as a Vercel Function.
export const prerender = false;

/** Humans need more than a couple of seconds to fill in the form. */
const MIN_FILL_MS = 3000;
const MAX_LINKS = 3;

const field = (form: FormData, name: string, max: number) =>
    String(form.get(name) ?? "")
        .trim()
        .slice(0, max);

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

const fallbackPage = (lang: Locale) => {
    const text =
        lang === "ro"
            ? { title: "Mesajul nu a putut fi trimis", body: "Te rugăm să ne scrii direct la", back: "Înapoi la contact" }
            : { title: "Your message could not be sent", body: "Please email us directly at", back: "Back to contact" };
    return `<!doctype html><html lang="${lang}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${text.title}</title><body style="font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1.25rem;line-height:1.6"><h1>${text.title}</h1><p>${text.body} <a href="mailto:${site.email}">${site.email}</a>.</p><p><a href="${path("contact", lang)}">${text.back}</a></p></body></html>`;
};

export const POST: APIRoute = async ({ request, redirect }) => {
    const wantsJson = request.headers.get("accept")?.includes("application/json") ?? false;

    let form: FormData;
    try {
        form = await request.formData();
    } catch {
        return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
    }

    const lang: Locale = form.get("lang") === "en" ? "en" : "ro";
    const ok = () => (wantsJson ? Response.json({ ok: true }) : redirect(path("contactThanks", lang), 303));
    const fail = (status: number, error: string) =>
        wantsJson
            ? Response.json({ ok: false, error }, { status })
            : new Response(fallbackPage(lang), { status, headers: { "Content-Type": "text/html; charset=utf-8" } });

    // Spam traps answer "ok" so bots learn nothing.
    if (field(form, "website", 200)) return ok();
    const startedAt = Number(form.get("ts"));
    if (startedAt && Date.now() - startedAt < MIN_FILL_MS) return ok();

    const name = field(form, "name", 120);
    const email = field(form, "email", 200);
    const phone = field(form, "phone", 40);
    const company = field(form, "company", 120);
    const message = field(form, "message", 5000);
    const interests = form
        .getAll("interest")
        .map((value) => String(value).slice(0, 60))
        .slice(0, 10);

    if (!name || !isEmail(email) || message.length < 10) return fail(422, "invalid");
    if ((message.match(/https?:\/\//gi) ?? []).length > MAX_LINKS) return ok();

    const rows: [string, string][] = [
        ["Nume / Name", name],
        ["Email", email],
        ["Telefon / Phone", phone],
        ["Companie / Company", company],
        ["Interes / Interest", interests.join(", ")],
        ["Limbă / Language", lang.toUpperCase()],
    ];
    const filled = rows.filter(([, value]) => value);

    if (!RESEND_API_KEY) {
        if (import.meta.env.DEV) {
            console.info("[contact] RESEND_API_KEY not set, message logged instead of sent:", { ...Object.fromEntries(filled), message });
            return ok();
        }
        console.error("[contact] RESEND_API_KEY is not set; message from %s was not delivered.", email);
        return fail(503, "not_configured");
    }

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            from: CONTACT_FROM_EMAIL || `Disconnect <noreply@${new URL(site.url).hostname}>`,
            to: [CONTACT_TO_EMAIL || site.email],
            reply_to: email,
            subject: `Mesaj nou de pe site: ${name}${company ? ` (${company})` : ""}`,
            text: `${filled.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\n${message}`,
            html: `<table cellpadding="6" style="font-family:system-ui,sans-serif;font-size:14px">${filled
                .map(([label, value]) => `<tr><td style="color:#666">${label}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`)
                .join("")}</table><p style="font-family:system-ui,sans-serif;font-size:15px;white-space:pre-wrap">${escapeHtml(message)}</p>`,
        }),
    });

    if (!response.ok) {
        console.error("[contact] Resend responded with %d: %s", response.status, await response.text());
        return fail(502, "delivery_failed");
    }

    return ok();
};

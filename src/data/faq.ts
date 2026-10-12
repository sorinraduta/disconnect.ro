import type { Locale } from "~/config/routes";

export interface FaqItem {
    question: string;
    answer: string;
}

/**
 * Answers are written to be quoted as-is by search engines and AI assistants (AEO/GEO):
 * the first sentence answers the question, the rest adds context.
 */
export const faq: Record<Locale, FaqItem[]> = {
    ro: [
        {
            question: "Cât costă un website?",
            answer: "Prețul depinde de numărul de pagini, funcționalități și conținut. După o discuție scurtă îți trimitem o ofertă fixă, pe etape, fără costuri ascunse. Domeniul, găzduirea și emailul pe domeniu sunt incluse în setup.",
        },
        {
            question: "Cât durează să fie gata site-ul?",
            answer: "Un site de prezentare este gata, de obicei, în 2–4 săptămâni. Proiectele cu branding complet, magazin sau aplicații web durează mai mult; calendarul exact îl stabilim împreună la început.",
        },
        {
            question: "De ce nu folosiți WordPress?",
            answer: "Construim cu tehnologii moderne pentru că rezultă site-uri mai rapide, mai sigure și mai ieftin de întreținut. Fără zeci de plugin-uri de actualizat și fără breșe de securitate, iar scorurile de performanță ajută direct SEO-ul.",
        },
        {
            question: "Ce înseamnă SEO, AEO și GEO?",
            answer: "SEO te ajută să apari în Google, AEO te ajută să fii răspunsul direct (fragmente recomandate, căutare vocală), iar GEO te ajută să fii recomandat de asistenți AI precum ChatGPT, Gemini sau Perplexity. Le lucrăm pe toate trei, din prima zi.",
        },
        {
            question: "Pot modifica singur conținutul site-ului?",
            answer: "Da. Pentru blog, știri sau produse configurăm un CMS simplu, iar pentru restul îți facem modificările rapid, în cadrul mentenanței.",
        },
        {
            question: "Al cui este site-ul după lansare?",
            answer: "Site-ul, domeniul și conturile sunt pe numele tău. Codul și accesele îți aparțin, chiar dacă la un moment dat alegi să lucrezi cu altcineva.",
        },
        {
            question: "Oferiți mentenanță și suport după lansare?",
            answer: "Da. Oferim abonamente lunare de mentenanță care includ actualizări, monitorizare, backup și modificări de conținut. Rămânem partenerul tău și după lansare.",
        },
        {
            question: "Lucrați doar cu afaceri mici și mijlocii?",
            answer: "Afacerile mici și mijlocii sunt focusul nostru principal, dar lucrăm și cu companii mari. Contează mai mult să ne potrivim ca mod de lucru decât mărimea firmei.",
        },
        {
            question: "Puteți gestiona și campaniile de marketing?",
            answer: "Da. Facem strategie, campanii Google Ads, Meta Ads și TikTok Ads, configurăm Google Business Profile și optimizăm constant pe baza datelor reale, nu a impresiilor.",
        },
        {
            question: "Lucrați și cu clienți din alte orașe sau din afara țării?",
            answer: "Da. Lucrăm remote cu clienți din toată România și din străinătate, în română sau engleză.",
        },
    ],
    en: [
        {
            question: "How much does a website cost?",
            answer: "The price depends on the number of pages, features and content. After a short call we send a fixed, staged quote with no hidden costs. Domain, hosting and email on your domain are included in the setup.",
        },
        {
            question: "How long does it take to build a website?",
            answer: "A business website is usually ready in 2–4 weeks. Projects with full branding, e-commerce or web apps take longer; we agree on the exact timeline together at the start.",
        },
        {
            question: "Why don't you use WordPress?",
            answer: "We build on modern technology because it produces faster, safer websites that cost less to maintain. No dozens of plugins to update, fewer security holes, and better performance scores that directly help SEO.",
        },
        {
            question: "What do SEO, AEO and GEO mean?",
            answer: "SEO helps you rank on Google, AEO helps you become the direct answer (featured snippets, voice search), and GEO helps AI assistants like ChatGPT, Gemini or Perplexity recommend you. We work on all three from day one.",
        },
        {
            question: "Can I edit the website content myself?",
            answer: "Yes. For a blog, news or products we set up a simple CMS, and for everything else we make changes quickly as part of maintenance.",
        },
        {
            question: "Who owns the website after launch?",
            answer: "The website, domain and accounts are in your name. The code and access belong to you, even if you decide to work with someone else later on.",
        },
        {
            question: "Do you offer maintenance and support after launch?",
            answer: "Yes. Our monthly maintenance plans cover updates, monitoring, backups and content changes. We stay your partner long after launch.",
        },
        {
            question: "Do you only work with small and mid-sized businesses?",
            answer: "Small and mid-sized businesses are our main focus, but we work with large companies too. A good fit in how we work matters more than company size.",
        },
        {
            question: "Can you run our marketing campaigns too?",
            answer: "Yes. We handle strategy, Google Ads, Meta Ads and TikTok Ads campaigns, set up your Google Business Profile and optimise continuously based on real data, not impressions.",
        },
        {
            question: "Do you work with clients from other cities or countries?",
            answer: "Yes. We work remotely with clients across Romania and abroad, in Romanian or English.",
        },
    ],
};

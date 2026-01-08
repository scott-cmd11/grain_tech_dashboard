import { Source } from "../../types/grainDataTypes";

export const sources: Source[] = [
    {
        id: "protein-industries-phone-tool-2023",
        title: "AI-powered grain quality assurance tool announced",
        url: "https://www.proteinindustriescanada.ca/news/ai-powered-grain-quality-tool",
        publisher: "Protein Industries Canada",
        kind: "press_release",
        publishedAt: "2023-09-14",
        linkStatus: "ok",
        support: "strong"
    },
    {
        id: "globalnews-supergeo-2023",
        title: "Saskatchewan-based tech company develops A.I. grain grading app",
        url: "https://globalnews.ca/news/9783365/ai-grain-grading-app-supergeo/",
        publisher: "Global News",
        kind: "news_article",
        publishedAt: "2023-07-10",
        linkStatus: "ok",
        support: "strong"
    },
    {
        id: "sga-grain-product",
        title: "AI-driven grain counting and grading product page",
        url: "https://sga.ai/products/grain/",
        publisher: "SGA's AI",
        kind: "product_page",
        linkStatus: "ok",
        support: "partial",
        note: "Good for product description, not an independent validation."
    }
];

export const sourcesById: Record<string, Source> = sources.reduce((acc, source) => {
    acc[source.id] = source;
    return acc;
}, {} as Record<string, Source>);

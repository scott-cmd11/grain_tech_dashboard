import { LinkMeta } from "../../types/grainDataTypes";

export const links: LinkMeta[] = [
    {
        id: "agsure-home",
        label: "AgSure homepage",
        url: "https://www.agsure.in",
        kind: "company_homepage",
        linkStatus: "ok",
        lastCheckedAt: "2026-01-01"
    },
    {
        id: "foss-eyefoss",
        label: "EyeFoss Product & Analysis",
        url: "https://www.agtecher.com/foss-eye-foss-digital-grain-quality-analysis/",
        kind: "product_page",
        linkStatus: "replaced",
        note: "Original FOSS site link was unstable; replaced with AgTecher article."
    },
    {
        id: "grain-discovery-project",
        label: "Grain Discovery Smartphone Project",
        url: "https://www.proteinindustriescanada.ca/projects/phone-grain-quality-tool",
        kind: "product_page",
        linkStatus: "ok"
    },
    {
        id: "platypus-home",
        label: "Platypus Vision Homepage",
        url: "https://www.platypusvision.com",
        kind: "company_homepage",
        linkStatus: "ok",
        note: "Replaces old Indyn link."
    },
    {
        id: "nebulaa-neo",
        label: "Nebulaa Neo / MATT",
        url: "https://neo.nebulaa.in",
        kind: "product_page",
        linkStatus: "ok"
    },
    {
        id: "supergeo-grain",
        label: "SuperGeo Grain Grading",
        url: "https://sga.ai/products/grain/",
        kind: "product_page",
        linkStatus: "ok"
    },
    {
        id: "videometer-seedlab",
        label: "Videometer SeedLab",
        url: "https://videometer.com/products/seedlab",
        kind: "product_page",
        linkStatus: "ok"
    },
    {
        id: "zeutec-grainvision",
        label: "SpectraAlyzer Grain Vision",
        url: "https://spectraalyzer.com/grain-vision-ai/",
        kind: "product_page",
        linkStatus: "ok"
    },
    {
        id: "zoomagri-home",
        label: "ZoomAgri Homepage",
        url: "https://zoomagri.com/en/home/",
        kind: "company_homepage",
        linkStatus: "ok"
    },
    {
        id: "fac-report-2023",
        label: "Farm Credit Canada Report",
        url: "https://www.fcc-fac.ca/en/knowledge/ag-economics/canadian-agriculture-productivity-and-trade-report.html",
        kind: "gov_document",
        linkStatus: "ok"
    }
];

export const linksById: Record<string, LinkMeta> = links.reduce((acc, link) => {
    acc[link.id] = link;
    return acc;
}, {} as Record<string, LinkMeta>);

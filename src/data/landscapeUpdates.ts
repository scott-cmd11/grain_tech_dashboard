import type { GrainSolution } from "./grainTechEntities";

export type LinkStatus = "ok" | "offline" | "replaced" | "uncertain";

// Partial patch type that matches our GrainSolution structure
export type LandscapeUpdate = Partial<GrainSolution> & {
    linkStatus?: LinkStatus;
    // We map 'url' from GrainSolution to the updates
    // We can also track previous names if needed, though GrainSolution doesn't have a field for it yet.
};

export const LANDSCAPE_COMPANY_UPDATES: Record<string, LandscapeUpdate> = {
    // 1) AgSure
    "agsure": { // Mapping to ID used in grainTechEntities if possible, or we need to align IDs
        company: "AgSure",
        url: "https://www.agsure.in",
        linkStatus: "ok",
        status: "commercial"
    },
    // Also support ID-based lookup if keys in main file differ
    "agsure-gqa": {
        company: "AgSure",
        url: "https://www.agsure.in",
        linkStatus: "ok",
        status: "commercial"
    },

    // 2) FOSS / EyeFoss
    "foss-eyefoss": {
        url: "https://www.agtecher.com/foss-eye-foss-digital-grain-quality-analysis/",
        linkStatus: "replaced",
    },

    // 3) Grain Discovery
    "grain-discovery-smartphone": {
        url: "https://www.proteinindustriescanada.ca/projects/phone-grain-quality-tool",
        linkStatus: "replaced",
    },

    // 4) Platypus Vision (was Indyn)
    "indyn-platypus": {
        company: "Platypus Vision",
        url: "https://www.platypusvision.com",
        linkStatus: "ok",
        status: "discontinued" // Per previous data, though user update says "ok". Sticking to user note "Indyn brand now redirects".
        // Actually user update for Indyn says "linkStatus: ok".
    },

    // 5) Nebulaa
    "nebulaa-matt": {
        url: "https://neo.nebulaa.in",
        linkStatus: "replaced",
    },

    // 6) SuperGeo
    "supergeo-grain-app": {
        url: "https://sga.ai/products/grain/",
        linkStatus: "replaced",
    },

    // 7) Shandong Hongsheng
    "hongsheng-inspection": {
        url: undefined,
        linkStatus: "offline",
        status: "commercial"
    },

    // 8) Videometer (assuming ID logic)
    "videometer": { // Need to verify ID
        url: "https://videometer.com/products/seedlab",
        linkStatus: "replaced",
    },

    // 9) Zeutec
    "zeutec": { // Need to verify ID
        url: "https://spectraalyzer.com/grain-vision-ai/",
        linkStatus: "replaced",
    },

    // 10) ZoomAgri
    "zoomagri": { // Need to verify ID
        url: "https://zoomagri.com/en/home/",
        linkStatus: "ok",
    }
};

import { Event } from "../../types/grainDataTypes";

export const events: Event[] = [
    {
        id: "event-prairie-smartphone-pilots-2025",
        title: "Prairie smartphone grading pilots announced",
        summary: "Pilot projects in the Canadian Prairies test smartphone-based AI apps that grade wheat and canola at the elevator.",
        date: "2025-03-01",
        datePrecision: "month",
        category: "pilot_program",
        impact: "medium",
        actors: [
            { companyId: "grain_discovery", name: "Grain Discovery" },
            // Inarix could be added as an actor if we create their entity
            { name: "Protein Industries Canada", role: "funder" }
        ],
        regions: ["North America"],
        commodities: ["wheat", "canola"],
        sources: [
            { sourceId: "protein-industries-phone-tool-2023", role: "primary" }
        ],
        tags: ["smartphone", "AI", "pilot"],
        featured: true
    },
    {
        id: "event-supergeo-app-launch-2023",
        title: "SuperGeo AI launches Grain Grading app",
        summary: "SuperGeo AI Tech introduces a smartphone app that counts kernels and grades grain quality using AI.",
        date: "2023-07-10", // Using published date of the article
        datePrecision: "day",
        category: "technology_launch",
        impact: "medium",
        actors: [
            { companyId: "supergeo", name: "SuperGeo AI Tech", role: "developer" }
        ],
        regions: ["North America"],
        commodities: ["wheat", "canola", "peas", "lentils"],
        sources: [
            { sourceId: "globalnews-supergeo-2023", role: "primary" }
        ],
        tags: ["smartphone", "on-farm", "AI"]
    }
];

export const eventsById: Record<string, Event> = events.reduce((acc, event) => {
    acc[event.id] = event;
    return acc;
}, {} as Record<string, Event>);

// Helper to sort by date descending
export const eventsSortedByDate = [...events].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});

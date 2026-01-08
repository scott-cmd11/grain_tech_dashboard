export type Status = "prototype" | "pilot" | "commercial" | "discontinued";
export type LinkStatus = "ok" | "offline" | "replaced" | "uncertain";

export type SourceKind =
    | "company_homepage"
    | "product_page"
    | "press_release"
    | "news_article"
    | "gov_document"
    | "research_paper"
    | "dataset"
    | "blog_post"
    | "other";

export type SourceSupport = "strong" | "partial" | "weak" | "contradictory";

export type Region =
    | "North America"
    | "South America"
    | "Europe"
    | "Africa"
    | "Asia"
    | "Oceania"
    | "Middle East"
    | "Global"
    | "Other"
    // Legacy regions to support existing data until fully migrated
    | "China"
    | "Australia"
    | "India";

export type CompanyId = string;
export type ProductId = string;
export type EventId = string;
export type SourceId = string;

export interface LinkMeta {
    id: string;
    label: string;
    url: string | null;
    kind: SourceKind;
    linkStatus: LinkStatus;
    replacedById?: string;
    lastCheckedAt?: string;
    note?: string;
}

export interface Product {
    id: ProductId;
    companyId: CompanyId;
    name: string;
    shortName?: string;
    description?: string;
    modality?: string;
    status: Status;
    firstLaunchYear?: number;
    lastActiveYear?: number;
    primaryUseCases?: string[];
    primaryLinkId?: string;
    linkIds?: string[];
    tags?: string[];
    // Legacy fields for backward compatibility during migration
    regions?: Region[];
    formFactors?: string[];
    sensingTech?: string[];
    accuracyPercent?: number;
    throughputSamplesPerHour?: number;
    avgTestDurationSeconds?: number;
    sampleSizeGrams?: number;
}

export interface Company {
    id: CompanyId;
    displayName: string;
    legalName?: string;
    aliases?: string[];
    country?: string;
    region?: Region;
    foundedYear?: number;
    segments?: string[];
    primaryLinkId?: string;
    linkIds: string[];
    status?: Status;
    isActive?: boolean;
    productIds: ProductId[];
    tags?: string[];
    maintainerNote?: string;
    /** Current CEO or primary leadership contact */
    ceo?: string;
    /** Company founders */
    founders?: string[];
    // Legacy fields
    primaryLat?: number;
    primaryLng?: number;
}

export interface Source {
    id: SourceId;
    title: string;
    url: string | null;
    publisher?: string;
    kind: SourceKind;
    publishedAt?: string;
    linkStatus: LinkStatus;
    support?: SourceSupport;
    replacedById?: string;
    note?: string;
}

export type EventCategory =
    | "technology_launch"
    | "pilot_program"
    | "regulatory_change"
    | "funding_round"
    | "standard_approval"
    | "market_adoption"
    | "academic_publication"
    | "other";

export type ImpactLevel = "low" | "medium" | "high";
export type DatePrecision = "day" | "month" | "year" | "approximate";

export interface EventActorRef {
    companyId?: CompanyId;
    productId?: ProductId;
    name?: string;
    role?: string;
}

export interface EventSourceRef {
    sourceId: SourceId;
    role?: "primary" | "secondary" | "context";
}

export interface Event {
    id: EventId;
    title: string;
    summary: string;
    date: string;
    datePrecision: DatePrecision;
    category: EventCategory;
    impact: ImpactLevel;
    actors: EventActorRef[];
    regions?: Region[];
    commodities?: string[];
    sources: EventSourceRef[];
    featured?: boolean;
    tags?: string[];
}

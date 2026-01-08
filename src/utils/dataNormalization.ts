import { companiesById } from "../data/registries/companies";
import { products } from "../data/registries/products";
import { linksById } from "../data/registries/links";
import type { GrainSolution, MaturityLevel, Region, SensingTech, FormFactor, UseCase, UserSegment } from "../data/grainTechEntities";


export const getDenormalizedSolutions = (): GrainSolution[] => {
    return products
        .filter(product => {
            const company = companiesById[product.companyId];
            if (!company) {
                console.warn(`Orphaned product found: ${product.id} (companyId: ${product.companyId})`);
                return false;
            }
            return true;
        })
        .map((product): GrainSolution => {
            const company = companiesById[product.companyId];
            // company is guaranteed to exist due to filter above

            const primaryLink = product.primaryLinkId ? linksById[product.primaryLinkId] :
                (company.primaryLinkId ? linksById[company.primaryLinkId] : undefined);

            // Map status to MaturityLevel
            let maturityLevel: MaturityLevel = "Commercial";
            if (product.status === "pilot") maturityLevel = "Pilot";
            else if (product.status === "prototype") maturityLevel = "Experimental";
            else if (product.status === "discontinued") maturityLevel = "Commercial"; // Or keep as is? App logic might need "Discontinued"

            // Note: GrainSolution interface might need to be updated to accept "Discontinued" if not already
            // For now mapping discontinued to Commercial but relying on the 'status' field which we added earlier.

            return {
                id: product.id,
                company: company.displayName,
                productName: product.name,

                // Legacy/Compatibility fields
                regions: (product.regions || (company.region ? [company.region as Region] : [])) as Region[],
                sensingTech: (product.sensingTech || []) as SensingTech[],
                formFactors: (product.formFactors || []) as FormFactor[],
                useCases: (product.primaryUseCases || []) as UseCase[],
                userSegments: [] as UserSegment[], // Not in new schema yet, default empty

                maturityLevel: maturityLevel,
                status: product.status, // Ensure GrainSolution has this from previous steps

                // Link formatting
                url: primaryLink?.url || undefined,
                linkStatus: primaryLink?.linkStatus,

                // Geo
                primaryLat: company.primaryLat,
                primaryLng: company.primaryLng,

                // Performance Metrics
                accuracyPercent: product.accuracyPercent,
                throughputSamplesPerHour: product.throughputSamplesPerHour,
                avgTestDurationSeconds: product.avgTestDurationSeconds,
                sampleSizeGrams: product.sampleSizeGrams,

                description: product.description,

                // Leadership info
                ceo: company.ceo,
                founders: company.founders,
                // citations: [] // TODO: retrieve from linked sources if we want to show references
            } as GrainSolution;
        });
};

import { describe, it, expect } from 'vitest';
import { filterGrainSolutions, getGrainFilterOptions } from './grainFilters';
import type { GrainSolution } from '../data/grainTechEntities';

const mockSolutions: GrainSolution[] = [
    {
        id: 'test-1',
        company: 'Test Company A',
        productName: 'Product A',
        regions: ['North America', 'Europe'],
        formFactors: ['Benchtop'],
        sensingTech: ['RGB', 'NIR'],
        useCases: ['ElevatorGrading'],
        userSegments: ['Farmer'],
        maturityLevel: 'Commercial',
    },
    {
        id: 'test-2',
        company: 'Test Company B',
        productName: 'Product B',
        regions: ['India'],
        formFactors: ['Smartphone'],
        sensingTech: ['RGB'],
        useCases: ['OnFarmPreGrading'],
        userSegments: ['Farmer'],
        maturityLevel: 'Pilot',
    },
    {
        id: 'test-3',
        company: 'Test Company C',
        productName: 'Product C',
        regions: ['Europe', 'Global'],
        formFactors: ['LabSystem'],
        sensingTech: ['HSI'],
        useCases: ['BreedingSeedLab', 'RegulatoryExport'],
        userSegments: ['Breeder'],
        maturityLevel: 'Commercial',
    },
];

describe('getGrainFilterOptions', () => {
    it('should extract unique regions from solutions', () => {
        const options = getGrainFilterOptions(mockSolutions);
        expect(options.regions).toContain('North America');
        expect(options.regions).toContain('Europe');
        expect(options.regions).toContain('India');
        expect(options.regions).toContain('Global');
    });

    it('should extract unique sensing tech from solutions', () => {
        const options = getGrainFilterOptions(mockSolutions);
        expect(options.sensing).toContain('RGB');
        expect(options.sensing).toContain('NIR');
        expect(options.sensing).toContain('HSI');
    });

    it('should return sorted arrays', () => {
        const options = getGrainFilterOptions(mockSolutions);
        const sortedRegions = [...options.regions].sort();
        expect(options.regions).toEqual(sortedRegions);
    });

    it('should handle empty input', () => {
        const options = getGrainFilterOptions([]);
        expect(options.regions).toEqual([]);
        expect(options.sensing).toEqual([]);
        expect(options.formFactors).toEqual([]);
        expect(options.useCases).toEqual([]);
    });
});

describe('filterGrainSolutions', () => {
    it('should return all solutions when no filters applied', () => {
        const result = filterGrainSolutions(mockSolutions, {
            regions: [],
            sensing: [],
            formFactors: [],
            useCases: [],
        });
        expect(result).toHaveLength(3);
    });

    it('should filter by region', () => {
        const result = filterGrainSolutions(mockSolutions, {
            regions: ['India'],
            sensing: [],
            formFactors: [],
            useCases: [],
        });
        expect(result).toHaveLength(1);
        expect(result[0].company).toBe('Test Company B');
    });

    it('should filter by sensing tech', () => {
        const result = filterGrainSolutions(mockSolutions, {
            regions: [],
            sensing: ['HSI'],
            formFactors: [],
            useCases: [],
        });
        expect(result).toHaveLength(1);
        expect(result[0].company).toBe('Test Company C');
    });

    it('should filter by form factor', () => {
        const result = filterGrainSolutions(mockSolutions, {
            regions: [],
            sensing: [],
            formFactors: ['Smartphone'],
            useCases: [],
        });
        expect(result).toHaveLength(1);
        expect(result[0].company).toBe('Test Company B');
    });

    it('should combine multiple filters with OR logic within categories', () => {
        // Solutions with North America OR India
        const result = filterGrainSolutions(mockSolutions, {
            regions: ['North America', 'India'],
            sensing: [],
            formFactors: [],
            useCases: [],
        });
        expect(result).toHaveLength(2);
    });

    it('should combine filters across categories with AND logic', () => {
        // Must have Europe AND RGB sensing
        const result = filterGrainSolutions(mockSolutions, {
            regions: ['Europe'],
            sensing: ['RGB'],
            formFactors: [],
            useCases: [],
        });
        expect(result).toHaveLength(1);
        expect(result[0].company).toBe('Test Company A');
    });
});

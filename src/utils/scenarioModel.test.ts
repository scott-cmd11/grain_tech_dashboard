
import { describe, it, expect } from 'vitest';
import { calculateScenario } from './scenarioModel';

describe('calculateScenario', () => {
    it('calculates correct time savings for Global region with 50% adoption', () => {
        // tons: 250,000,000
        // samples: 250,000,000 / 50 = 5,000,000 samples
        // timeSavedSeconds: 900 - 45 = 855 seconds per sample
        // avgAdoption: 0.5 (if all are 50%)
        // totalSecondsSaved: 5,000,000 * 855 * 0.5 = 2,137,500,000
        // totalHoursSaved: 2,137,500,000 / 3600 = 593,750

        const result = calculateScenario({
            region: 'Global',
            onFarmAdoption: 50,
            elevatorAdoption: 50,
            regulatoryAdoption: 50
        });

        expect(result.avgAdoption).toBeCloseTo(0.5);
        expect(result.timeSavedSeconds).toBe(855);
        // Allow for small floating point differences
        expect(result.timeSavedHours).toBeCloseTo(593750, 0);
    });

    it('calculates zero improvement for 0% adoption', () => {
        const result = calculateScenario({
            region: 'North America',
            onFarmAdoption: 0,
            elevatorAdoption: 0,
            regulatoryAdoption: 0
        });

        expect(result.incrementalValueUSD).toBe(0);
        expect(result.timeSavedHours).toBe(0);
        expect(result.riskReductionScore).toBe(0);
    });
});

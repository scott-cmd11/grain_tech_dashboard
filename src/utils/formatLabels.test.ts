import { describe, it, expect } from 'vitest';
import { formatEnumLabel, formatEnumList } from './formatLabels';

describe('formatEnumLabel', () => {
    it('should convert camelCase to spaced words', () => {
        expect(formatEnumLabel('OnFarmPreGrading')).toBe('On Farm Pre Grading');
        expect(formatEnumLabel('ElevatorGrading')).toBe('Elevator Grading');
    });

    it('should handle single word enums', () => {
        expect(formatEnumLabel('Commercial')).toBe('Commercial');
        expect(formatEnumLabel('Pilot')).toBe('Pilot');
    });

    it('should apply label overrides for acronyms', () => {
        expect(formatEnumLabel('RGB')).toBe('Red/Green/Blue Imaging (RGB)');
        expect(formatEnumLabel('NIR')).toBe('Near-Infrared (NIR)');
        expect(formatEnumLabel('HSI')).toBe('Hyperspectral Imaging (HSI)');
    });

    it('should handle already spaced strings', () => {
        expect(formatEnumLabel('North America')).toBe('North America');
    });
});

describe('formatEnumList', () => {
    it('should join items with commas using formatted labels', () => {
        expect(formatEnumList(['Commercial', 'Pilot'])).toBe('Commercial, Pilot');
    });

    it('should truncate long lists', () => {
        const result = formatEnumList(['North America', 'Europe', 'India', 'China'], 2);
        expect(result).toContain('North America');
        expect(result).toContain('+2');
    });

    it('should handle empty arrays', () => {
        expect(formatEnumList([])).toBe('');
    });

    it('should handle single item', () => {
        expect(formatEnumList(['Commercial'])).toBe('Commercial');
    });
});

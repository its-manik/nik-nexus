import { describe, expect, it } from 'vitest';
import { formatAddress, formatNumber, formatEther, classNames } from '../utils';

describe('utils', () => {
  describe('formatAddress', () => {
    it('formats Ethereum addresses correctly', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      expect(formatAddress(address)).toBe('0x1234...5678');
    });

    it('handles custom length', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      expect(formatAddress(address, 6)).toBe('0x123456...345678');
    });

    it('returns empty string for invalid input', () => {
      expect(formatAddress('')).toBe('');
    });
  });

  describe('formatNumber', () => {
    it('formats numbers with commas', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
    });

    it('handles string numbers', () => {
      expect(formatNumber('1234567')).toBe('1,234,567');
    });

    it('handles decimals', () => {
      expect(formatNumber(1234567.89)).toBe('1,234,567.89');
    });
  });

  describe('formatEther', () => {
    it('converts Wei to Ether', () => {
      expect(formatEther('1000000000000000000')).toBe('1.0000');
    });

    it('handles custom decimals', () => {
      expect(formatEther('1000000000000000000', 2)).toBe('1.00');
    });

    it('handles number input', () => {
      expect(formatEther(1000000000000000000)).toBe('1.0000');
    });
  });

  describe('classNames', () => {
    it('combines class names', () => {
      expect(classNames('a', 'b', 'c')).toBe('a b c');
    });

    it('filters out falsy values', () => {
      expect(classNames('a', null, undefined, false, 'b')).toBe('a b');
    });

    it('handles empty input', () => {
      expect(classNames()).toBe('');
    });
  });
});
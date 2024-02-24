import { describe, expect, it } from 'vitest';
import { add, divide, multiply, subtract } from './operations';

describe('operations', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should subtract two numbers', () => {
    expect(subtract(2, 1)).toBe(1);
  });

  it('should multiply two numbers', () => {
    expect(multiply(3, 2)).toBe(6);
  });

  it('should divide two numbers', () => {
    expect(divide(4, 2)).toBe(2);
    expect(() => divide(4, 0)).toThrowError('Cannot divide by zero!');
  });
});

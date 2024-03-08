import { describe, expect, test } from 'vitest';
import { formValidator } from './validator';

describe('Form validation', () => {
  test('should return an error if first name is missing', () => {
    const errors = formValidator('', 'Doe', 30);
    expect(errors).toContain('First name is required');
  });

  test('should return an error if last name is missing', () => {
    const errors = formValidator('John', '', 30);
    expect(errors).toContain('Last name is required');
  });

  test('should return an error if age is negative', () => {
    const errors = formValidator('John', 'Doe', -1);
    expect(errors).toContain('Age must be a positive number');
  });

  test('should pass if all fields are valid', () => {
    const errors = formValidator('John', 'Doe', 30);
    expect(errors).toHaveLength(0);
  });

  test('should return an error if first name length is lower than or equal 1', () => {
    const errors = formValidator('J', 'Doe', 30);
    expect(errors).toContain('First name must be at least 2 character long');
  });

  test('should return an error if last name length is lower than or equal 1', () => {
    const errors = formValidator('Joe', 'D', 30);
    expect(errors).toContain('Last name must be at least 2 character long');
  });

  test('should return an error if age is not number', () => {
    // ignore typescript to pass string value
    // @ts-ignore
    expect(formValidator('Joe', 'D', '2')).toContain('Age must be a number');
    expect(formValidator('Joe', 'D', NaN)).toContain('Age must be a number');
  });
});

export function formValidator(
  firstName: string,
  lastName: string,
  age: number
) {
  const errors: string[] = [];

  if (!firstName) {
    errors.push('First name is required');
  }

  if (firstName.length <= 1) {
    errors.push('First name must be at least 2 character long');
  }

  if (!lastName) {
    errors.push('Last name is required');
  }

  if (lastName.length <= 1) {
    errors.push('Last name must be at least 2 character long');
  }

  if (typeof age !== 'number' || isNaN(age)) {
    errors.push('Age must be a number');
  }

  if (age < 0) {
    errors.push('Age must be a positive number');
  }

  return errors;
}

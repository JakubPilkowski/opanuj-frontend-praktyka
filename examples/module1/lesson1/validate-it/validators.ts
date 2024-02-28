// for simplicity we assume that the value is a string

export function isFilled(value: string) {
  return value !== '';
}

export function isInteger(value: string | number) {
  return value !== null && Number.isInteger(+value);
}

export function isGreatherThan(value: string | number, min: number) {
  return +value > min;
}

export function isLessThan(value: string | number, max: number) {
  return +value < max;
}

export function isEven(value: string | number) {
  return +value % 2 === 0;
}

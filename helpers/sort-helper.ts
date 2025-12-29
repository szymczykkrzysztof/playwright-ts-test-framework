export function sortStringsAscending(array: string[]): string[] {
  return [...array].sort((a, b) => a.localeCompare(b));
}

export function sortStringsDescending(array: string[]): string[] {
  return [...array].sort((b, a) => a.localeCompare(b));
}

export function sortNumbersAscending(array: number[]): number[] {
  return [...array].sort((a, b) => a - b);
}

export function sortNumbersDescending(array: number[]): number[] {
  return [...array].sort((b, a) => a - b);
}

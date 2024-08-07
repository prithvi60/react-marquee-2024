export function CloneList(arr: any) {
  const n = arr.length;
  if (n === 0) return []; // If the array is empty, return an empty array

  const repeatCount = Math.floor(8 / n);
  const remainder = 8 % n;
  // we will always have 16 elements to scroll
  return Array.from({ length: repeatCount }, () => arr)
    .flat()
    .concat(arr.slice(0, remainder));
}

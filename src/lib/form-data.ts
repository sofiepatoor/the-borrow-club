/**
 * Helpers for parsing FormData in server actions.
 */

export function parseOptionalInt(formData: FormData, key: string): number | null {
  const raw = formData.get(key);
  if (raw === null || raw === undefined || String(raw).trim() === '') return null;
  const n = parseInt(String(raw), 10);
  return Number.isNaN(n) ? null : n;
}

export function parseCheckbox(formData: FormData, key: string): boolean {
  return formData.get(key) != null && formData.get(key) !== 'false';
}

export function filterEnumValues<T extends string>(
  values: FormDataEntryValue[],
  enumObj: Record<string, string>,
): T[] {
  const valid = new Set(Object.values(enumObj));
  return values
    .map((v) => String(v).trim())
    .filter((v) => valid.has(v)) as T[];
}

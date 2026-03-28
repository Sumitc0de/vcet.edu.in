import type { AdmissionItem, AdmissionSection } from '../../admin/types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function getSectionContentValue(section: AdmissionSection | null, key: string, fallback = ''): string {
  const content = section?.content;
  if (!isRecord(content)) return fallback;

  const value = content[key];
  return typeof value === 'string' ? value : fallback;
}

export function getSectionHeadingValue(section: AdmissionSection | null, key: string, fallback: string): string {
  const content = section?.content;
  if (!isRecord(content)) return fallback;

  const sectionHeadings = content.section_headings;
  if (!isRecord(sectionHeadings)) return fallback;

  const value = sectionHeadings[key];
  return typeof value === 'string' ? value : fallback;
}

export function groupCourseItems(items: AdmissionItem[] = []) {
  return items.reduce(
    (groups, item) => {
      const category = (item.category ?? '').trim().toLowerCase();

      if (category === 'ug') {
        groups.ug.push(item);
      } else if (category === 'pg') {
        groups.pg.push(item);
      } else if (category === 'management') {
        groups.management.push(item);
      }

      return groups;
    },
    { ug: [] as AdmissionItem[], pg: [] as AdmissionItem[], management: [] as AdmissionItem[] },
  );
}

export function groupItemsByGroupKey(items: AdmissionItem[] = []) {
  return items.reduce<Record<string, AdmissionItem[]>>((groups, item) => {
    const key = (item.group_key ?? 'default').trim() || 'default';
    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);
    return groups;
  }, {});
}

export function uniqueAcademicYears(items: AdmissionItem[] = []): string[] {
  return [...new Set(items.map((item) => item.academic_year).filter((value): value is string => Boolean(value)))]
    .sort((left, right) => right.localeCompare(left));
}


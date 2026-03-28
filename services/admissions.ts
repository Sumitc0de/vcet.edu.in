import type { AdmissionItem, AdmissionSection } from '../admin/types';
import { MOCK_ADMISSION_SECTIONS, readMockCollection } from '../admin/api/mockStore';
import { get } from './api';
import { USE_PUBLIC_MOCK } from './publicData';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';

function normalizeItem(item: AdmissionItem): AdmissionItem {
  return {
    ...item,
    image_url: resolveUploadedAssetUrl(item.image_url),
    admin_image_url: resolveUploadedAssetUrl(item.admin_image_url),
    pdf_url: resolveUploadedAssetUrl(item.pdf_url),
    admin_pdf_url: resolveUploadedAssetUrl(item.admin_pdf_url),
    document_url: resolveUploadedAssetUrl(item.document_url) ?? item.external_url ?? null,
  };
}

function normalizeSection(section: AdmissionSection): AdmissionSection {
  return {
    ...section,
    items: (section.items ?? [])
      .filter((item) => item.is_active)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map(normalizeItem),
  };
}

function sortSections(sections: AdmissionSection[]): AdmissionSection[] {
  return [...sections].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

export const admissionsService = {
  list: async (): Promise<AdmissionSection[]> => {
    const sections = USE_PUBLIC_MOCK
      ? readMockCollection<AdmissionSection>('vcet_mock_admission_sections', MOCK_ADMISSION_SECTIONS)
      : await get<AdmissionSection[]>('/admissions');

    return sortSections(sections)
      .filter((section) => section.is_active)
      .map(normalizeSection);
  },

  getBySlug: async (slug: string): Promise<AdmissionSection> => {
    if (USE_PUBLIC_MOCK) {
      const section = readMockCollection<AdmissionSection>('vcet_mock_admission_sections', MOCK_ADMISSION_SECTIONS)
        .find((item) => item.slug === slug);

      if (!section) {
        throw new Error(`Admission section "${slug}" not found`);
      }

      return normalizeSection(section);
    }

    return normalizeSection(await get<AdmissionSection>(`/admissions/${slug}`));
  },
};


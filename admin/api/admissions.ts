import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, AdmissionSection, AdmissionSectionPayload, AdmissionItem, AdmissionItemPayload } from '../types';
import { createMockCrud, MOCK_ADMISSION_SECTIONS } from './mockStore';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<AdmissionSection>(MOCK_ADMISSION_SECTIONS, 'vcet_mock_admission_sections') : null;
type AdmissionSectionLookup = number | string;

interface AdmissionSectionsResponse {
  data: AdmissionSection[];
}

interface AdmissionSectionResponse {
  message: string;
  section: AdmissionSection;
}

interface AdmissionItemResponse {
  message: string;
  item: AdmissionItem;
}

function normalizeSection(section: AdmissionSection): AdmissionSection {
  return {
    ...section,
    items: section.items?.map(normalizeItem),
  };
}

function unwrapSections(payload: AdmissionSection[] | AdmissionSectionsResponse): AdmissionSection[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  return Array.isArray(payload.data) ? payload.data : [];
}

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

function appendNullable(formData: FormData, key: string, value: string | boolean | number | null | undefined): void {
  if (value === null || value === undefined || value === '') return;
  if (typeof value === 'boolean') {
    formData.append(key, value ? '1' : '0');
    return;
  }

  formData.append(key, String(value));
}

function itemToFormData(payload: AdmissionItemPayload, method?: 'PATCH'): FormData {
  const formData = new FormData();
  formData.append('item_type', payload.item_type.trim());
  formData.append('title', payload.title.trim());
  appendNullable(formData, 'subtitle', payload.subtitle?.trim() ?? null);
  appendNullable(formData, 'description', payload.description?.trim() ?? null);
  appendNullable(formData, 'category', payload.category?.trim() ?? null);
  appendNullable(formData, 'academic_year', payload.academic_year?.trim() ?? null);
  appendNullable(formData, 'badge', payload.badge?.trim() ?? null);
  appendNullable(formData, 'tag', payload.tag?.trim() ?? null);
  appendNullable(formData, 'group_key', payload.group_key?.trim() ?? null);
  appendNullable(formData, 'group_label', payload.group_label?.trim() ?? null);
  appendNullable(formData, 'intake', payload.intake ?? null);
  appendNullable(formData, 'metadata', payload.metadata ? JSON.stringify(payload.metadata) : null);
  appendNullable(formData, 'external_url', payload.external_url?.trim() ?? null);
  appendNullable(formData, 'is_active', payload.is_active ?? true);
  appendNullable(formData, 'sort_order', payload.sort_order ?? null);

  if (payload.remove_image) {
    formData.append('remove_image', '1');
  }
  if (payload.remove_pdf) {
    formData.append('remove_pdf', '1');
  }
  if (payload.image) {
    formData.append('image', payload.image);
  }
  if (payload.pdf) {
    formData.append('pdf', payload.pdf);
  }

  if (method) {
    formData.append('_method', method);
  }

  return formData;
}

function toMockSectionPayload(payload: AdmissionSectionPayload): Partial<AdmissionSection> {
  return {
    slug: payload.slug.trim(),
    navigation_title: payload.navigation_title?.trim() ?? null,
    title: payload.title.trim(),
    summary: payload.summary?.trim() ?? null,
    description: payload.description?.trim() ?? null,
    section_type: payload.section_type ?? null,
    has_dropdown: payload.has_dropdown ?? false,
    dropdown_key: payload.dropdown_key?.trim() ?? null,
    content: payload.content ?? null,
    is_active: payload.is_active ?? true,
    sort_order: payload.sort_order ?? 0,
  };
}

function toMockItemPayload(payload: AdmissionItemPayload): Partial<AdmissionItem> {
  const base: Partial<AdmissionItem> = {
    item_type: payload.item_type.trim(),
    title: payload.title.trim(),
    subtitle: payload.subtitle?.trim() ?? null,
    description: payload.description?.trim() ?? null,
    category: payload.category?.trim() ?? null,
    academic_year: payload.academic_year?.trim() ?? null,
    badge: payload.badge?.trim() ?? null,
    tag: payload.tag?.trim() ?? null,
    group_key: payload.group_key?.trim() ?? null,
    group_label: payload.group_label?.trim() ?? null,
    intake: payload.intake ?? null,
    metadata: payload.metadata ?? null,
    external_url: payload.external_url?.trim() ?? null,
    is_active: payload.is_active ?? true,
    sort_order: payload.sort_order ?? 0,
  };

  if (payload.remove_image) {
    return {
      ...base,
      image_name: null,
      image_mime_type: null,
      image_size: null,
      has_image: false,
      image_url: null,
      admin_image_url: null,
    };
  }

  if (payload.image) {
    const imageUrl = URL.createObjectURL(payload.image);
    return {
      ...base,
      image_name: payload.image.name,
      image_mime_type: payload.image.type || 'image/jpeg',
      image_size: payload.image.size,
      has_image: true,
      image_url: imageUrl,
      admin_image_url: imageUrl,
    };
  }

  if (payload.remove_pdf) {
    return {
      ...base,
      pdf_name: null,
      pdf_mime_type: null,
      pdf_size: null,
      has_pdf: false,
      pdf_url: null,
      admin_pdf_url: null,
    };
  }

  if (payload.pdf) {
    const pdfUrl = URL.createObjectURL(payload.pdf);
    return {
      ...base,
      pdf_name: payload.pdf.name,
      pdf_mime_type: payload.pdf.type || 'application/pdf',
      pdf_size: payload.pdf.size,
      has_pdf: true,
      pdf_url: pdfUrl,
      admin_pdf_url: pdfUrl,
    };
  }

  return base;
}

function normalizeSectionPayload(payload: AdmissionSectionPayload): AdmissionSectionPayload {
  return {
    slug: payload.slug.trim(),
    navigation_title: payload.navigation_title?.trim() ?? null,
    title: payload.title.trim(),
    summary: payload.summary?.trim() ?? null,
    description: payload.description?.trim() ?? null,
    section_type: payload.section_type ?? null,
    has_dropdown: payload.has_dropdown ?? false,
    dropdown_key: payload.dropdown_key?.trim() ?? null,
    content: payload.content ?? null,
    is_active: payload.is_active ?? true,
    sort_order: payload.sort_order ?? 0,
  };
}

async function loadSections(): Promise<AdmissionSection[]> {
  const payload = await client.request<AdmissionSection[] | AdmissionSectionsResponse>('/admissions/all');
  return unwrapSections(payload).map(normalizeSection);
}

async function resolveSectionRouteKey(sectionLookup: AdmissionSectionLookup): Promise<string> {
  if (typeof sectionLookup === 'string') {
    return sectionLookup;
  }

  const sections = await loadSections();
  const section = sections.find((item) => item.id === sectionLookup);

  if (!section) {
    throw new Error(`Admission section ${sectionLookup} not found`);
  }

  return section.slug;
}

async function fetchSection(sectionLookup: AdmissionSectionLookup): Promise<AdmissionSection> {
  const sections = await loadSections();
  const section = sections.find((item) =>
    typeof sectionLookup === 'string' ? item.slug === sectionLookup : item.id === sectionLookup,
  );

  if (!section) {
    throw new Error(`Admission section ${sectionLookup} not found`);
  }

  return section;
}

async function resolveMockSection(sectionLookup: AdmissionSectionLookup): Promise<AdmissionSection> {
  const sections = await mock!.list();
  const section = sections.data.find((item) =>
    typeof sectionLookup === 'string' ? item.slug === sectionLookup : item.id === sectionLookup,
  );

  if (!section) {
    throw new Error(`Admission section ${sectionLookup} not found`);
  }

  return section;
}

export const admissionsApi = {
  listSections: USE_MOCK
    ? async () => {
        const response = await mock!.list();
        return {
          success: true,
          data: response.data.map(normalizeSection),
        } as ListResponse<AdmissionSection>;
      }
    : async () => {
        const payload = await client.request<AdmissionSection[] | AdmissionSectionsResponse>('/admissions/all');
        return {
          success: true,
          data: unwrapSections(payload).map(normalizeSection),
        } as ListResponse<AdmissionSection>;
      },

  getSection: USE_MOCK
    ? async (sectionLookup: AdmissionSectionLookup) => {
        if (typeof sectionLookup === 'string') {
          const sections = await mock!.list();
          const section = sections.data.find((item) => item.slug === sectionLookup);
          if (!section) throw new Error(`Admission section ${sectionLookup} not found`);
          return { success: true, data: normalizeSection(section) } as ItemResponse<AdmissionSection>;
        }

        const response = await mock!.get(sectionLookup);
        return {
          ...response,
          data: normalizeSection(response.data),
        } as ItemResponse<AdmissionSection>;
      }
    : async (sectionLookup: AdmissionSectionLookup) => {
        const section = await fetchSection(sectionLookup);
        return { success: true, data: normalizeSection(section) } as ItemResponse<AdmissionSection>;
      },

  createSection: USE_MOCK
    ? async (payload: AdmissionSectionPayload) => {
        const response = await mock!.create(toMockSectionPayload(payload));
        return {
          ...response,
          data: normalizeSection(response.data),
        } as ItemResponse<AdmissionSection>;
      }
    : async (payload: AdmissionSectionPayload) => {
        const response = await client.request<AdmissionSectionResponse>('/admissions', {
          method: 'POST',
          body: JSON.stringify(normalizeSectionPayload(payload)),
        });
        return {
          success: true,
          data: normalizeSection(response.section),
          message: response.message,
        } as ItemResponse<AdmissionSection>;
      },

  updateSection: USE_MOCK
    ? async (sectionLookup: AdmissionSectionLookup, payload: AdmissionSectionPayload) => {
        const sectionId = typeof sectionLookup === 'string'
          ? (await resolveMockSection(sectionLookup)).id
          : sectionLookup;
        const response = await mock!.update(sectionId, toMockSectionPayload(payload));
        return {
          ...response,
          data: normalizeSection(response.data),
        } as ItemResponse<AdmissionSection>;
      }
    : async (sectionLookup: AdmissionSectionLookup, payload: AdmissionSectionPayload) => {
        const routeKey = await resolveSectionRouteKey(sectionLookup);
        const response = await client.request<AdmissionSectionResponse>(`/admissions/${routeKey}`, {
          method: 'PATCH',
          body: JSON.stringify(normalizeSectionPayload(payload)),
        });
        return {
          success: true,
          data: normalizeSection(response.section),
          message: response.message,
        } as ItemResponse<AdmissionSection>;
      },

  deleteSection: USE_MOCK
    ? async (sectionLookup: AdmissionSectionLookup) => {
        if (typeof sectionLookup === 'string') {
          const sections = await mock!.list();
          const section = sections.data.find((item) => item.slug === sectionLookup);
          if (!section) throw new Error(`Admission section ${sectionLookup} not found`);
          return mock!.delete(section.id);
        }

        return mock!.delete(sectionLookup);
      }
    : async (sectionLookup: AdmissionSectionLookup) => {
        const routeKey = await resolveSectionRouteKey(sectionLookup);
        const response = await client.request<{ message: string }>(`/admissions/${routeKey}`, { method: 'DELETE' });
        return {
          success: true,
          message: response.message,
        } as DeleteResponse;
      },

  createItem: USE_MOCK
    ? async (sectionLookup: AdmissionSectionLookup, payload: AdmissionItemPayload) => {
        const section = typeof sectionLookup === 'string'
          ? (await mock!.list()).data.find((item) => item.slug === sectionLookup)
          : (await mock!.get(sectionLookup)).data;

        if (!section) {
          throw new Error(`Admission section ${sectionLookup} not found`);
        }

        const newItem: AdmissionItem = {
          ...toMockItemPayload(payload),
          id: Date.now(),
          admission_section_id: section.id,
        } as AdmissionItem;
        const items = [...(section.items || []), newItem];
        await mock!.update(section.id, { items } as Partial<AdmissionSection>);
        return {
          success: true,
          data: normalizeItem(newItem),
          message: 'Item created successfully.',
        } as ItemResponse<AdmissionItem>;
      }
    : async (sectionLookup: AdmissionSectionLookup, payload: AdmissionItemPayload) => {
        const routeKey = await resolveSectionRouteKey(sectionLookup);
        const response = await client.requestForm<AdmissionItemResponse>(
          `/admissions/${routeKey}/items`,
          itemToFormData(payload),
        );
        return {
          success: true,
          data: normalizeItem(response.item),
          message: response.message,
        } as ItemResponse<AdmissionItem>;
      },

  updateItem: USE_MOCK
    ? async (itemId: number, payload: AdmissionItemPayload) => {
        const sections = await mock!.list();
        for (const section of sections.data) {
          const itemIndex = section.items?.findIndex((i) => i.id === itemId) ?? -1;
          if (itemIndex >= 0 && section.items) {
            const updatedItem = { ...section.items[itemIndex], ...toMockItemPayload(payload) };
            const items = [...section.items];
            items[itemIndex] = updatedItem;
            await mock!.update(section.id, { items } as Partial<AdmissionSection>);
            return {
              success: true,
              data: normalizeItem(updatedItem),
              message: 'Item updated successfully.',
            } as ItemResponse<AdmissionItem>;
          }
        }
        throw new Error(`Item ${itemId} not found`);
      }
    : async (itemId: number, payload: AdmissionItemPayload) => {
        const response = await client.requestForm<AdmissionItemResponse>(
          `/admission-items/${itemId}`,
          itemToFormData(payload, 'PATCH'),
        );
        return {
          success: true,
          data: normalizeItem(response.item),
          message: response.message,
        } as ItemResponse<AdmissionItem>;
      },

  deleteItem: USE_MOCK
    ? async (itemId: number) => {
        const sections = await mock!.list();
        for (const section of sections.data) {
          const itemIndex = section.items?.findIndex((i) => i.id === itemId) ?? -1;
          if (itemIndex >= 0 && section.items) {
            const items = section.items.filter((i) => i.id !== itemId);
            await mock!.update(section.id, { items } as Partial<AdmissionSection>);
            return {
              success: true,
              message: 'Item deleted successfully.',
            } as DeleteResponse;
          }
        }
        throw new Error(`Item ${itemId} not found`);
      }
    : async (itemId: number) => {
        const response = await client.request<{ message: string }>(`/admission-items/${itemId}`, { method: 'DELETE' });
        return {
          success: true,
          message: response.message,
        } as DeleteResponse;
      },

  getItem: USE_MOCK
    ? async (itemId: number) => {
        const sections = await mock!.list();
        for (const section of sections.data) {
          const item = section.items?.find((i) => i.id === itemId);
          if (item) {
            return {
              success: true,
              data: normalizeItem(item),
            } as ItemResponse<AdmissionItem>;
          }
        }
        throw new Error(`Item ${itemId} not found`);
      }
    : async (itemId: number) => {
        const response = await client.request<AdmissionItem>(`/admission-items/${itemId}`);
        return { success: true, data: normalizeItem(response) } as ItemResponse<AdmissionItem>;
      },
};

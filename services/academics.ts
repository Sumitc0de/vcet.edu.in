import { get, resolveApiUrl } from './api';

export interface AcademicDocument {
  title: string;
  description: string;
  year: string;
  fileUrl: string | null;
  fileName: string | null;
}

export interface AcademicsData {
  programBooklets: AcademicDocument[];
  academicCalendars: AcademicDocument[];
  updatedAt: string;
}

interface AcademicsResponse {
  data: AcademicsData;
}

type AcademicDocumentApi = Partial<AcademicDocument> & {
  file_url?: string | null;
  file_name?: string | null;
};

type AcademicsDataApi = Partial<AcademicsData> & {
  program_booklets?: AcademicDocumentApi[];
  academic_calendars?: AcademicDocumentApi[];
  updated_at?: string;
};

function normalizeDocument(doc: AcademicDocumentApi): AcademicDocument {
  return {
    title: doc.title ?? '',
    description: doc.description ?? '',
    year: doc.year ?? '',
    fileName: doc.fileName ?? doc.file_name ?? null,
    fileUrl: resolveApiUrl(doc.fileUrl ?? doc.file_url ?? null),
  };
}

function normalizeAcademicsData(raw: unknown): AcademicsData {
  const payload = (raw && typeof raw === 'object' ? raw : {}) as {
    data?: unknown;
  };

  const source = (payload.data && typeof payload.data === 'object'
    ? payload.data
    : payload) as AcademicsDataApi;

  const programBooklets = Array.isArray(source.programBooklets)
    ? source.programBooklets
    : Array.isArray(source.program_booklets)
      ? source.program_booklets
      : [];

  const academicCalendars = Array.isArray(source.academicCalendars)
    ? source.academicCalendars
    : Array.isArray(source.academic_calendars)
      ? source.academic_calendars
      : [];

  return {
    programBooklets: programBooklets.map(normalizeDocument),
    academicCalendars: academicCalendars.map(normalizeDocument),
    updatedAt: source.updatedAt ?? source.updated_at ?? '',
  };
}

export const academicsService = {
  get: async (): Promise<AcademicsData> => {
    const response = await get<AcademicsResponse | AcademicsDataApi>('/pages/academics');
    return normalizeAcademicsData(response);
  },
};

import { noticesService, type NoticeRecord } from '../services/notices';
import { useFetch } from './useFetch';

const REFRESH_INTERVAL_MS = 60_000;

export function useNotices() {
  const { data, loading, error } = useFetch<NoticeRecord[]>(() => noticesService.list(), {
    initialData: [],
    cacheKey: 'public:notices:list',
    cacheTtlMs: 60_000,
    refreshIntervalMs: REFRESH_INTERVAL_MS,
    revalidateOnFocus: true,
    revalidateOnVisibility: true,
  });

  return { notices: data, loading, error };
}

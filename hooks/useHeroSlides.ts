import { heroSlidesService, type HeroSlideRecord } from '../services/heroSlides';
import { useFetch } from './useFetch';

const REFRESH_INTERVAL_MS = 60_000;

export function useHeroSlides() {
  const { data, loading, error } = useFetch<HeroSlideRecord[]>(() => heroSlidesService.list(), {
    initialData: [],
    cacheKey: 'public:hero-slides:list',
    cacheTtlMs: 60_000,
    refreshIntervalMs: REFRESH_INTERVAL_MS,
    revalidateOnFocus: true,
    revalidateOnVisibility: true,
  });

  return { slides: data, loading, error };
}

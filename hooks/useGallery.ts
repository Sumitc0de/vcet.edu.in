import { getGalleries } from '../services/gallery';
import type { Gallery } from '../admin/types';
import { useFetch } from './useFetch';

export function useGallery() {
	const { data, loading, error } = useFetch<Gallery[]>(() => getGalleries(), {
		initialData: [],
		cacheKey: 'public:gallery:list',
		cacheTtlMs: 5 * 60_000,
		revalidateOnFocus: true,
		revalidateOnVisibility: true,
	});

	return { images: data, loading, error };
}

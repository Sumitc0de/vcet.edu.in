import { placementPartnersService } from '../services/placementPartners';
import type { PlacementPartner } from '../admin/types';
import { useFetch } from './useFetch';

export function usePlacementPartners() {
	const { data, loading, error } = useFetch<PlacementPartner[]>(
		() => placementPartnersService.list(),
		{
			initialData: [],
			cacheKey: 'public:placement-partners:list',
			cacheTtlMs: 10 * 60_000,
			revalidateOnFocus: true,
			revalidateOnVisibility: true,
		},
	);

	return { partners: data, loading, error };
}

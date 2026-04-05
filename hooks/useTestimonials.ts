import { getTestimonials, TestimonialDTO } from '../services/testimonials';
import { useFetch } from './useFetch';

export const useTestimonials = () => {
  const { data, loading, error } = useFetch<TestimonialDTO[]>(() => getTestimonials(), {
    initialData: [],
    cacheKey: 'public:testimonials:list',
    cacheTtlMs: 5 * 60_000,
    revalidateOnFocus: true,
    revalidateOnVisibility: true,
  });

  return { testimonials: data, loading, error: error ? new Error(error) : null };
};

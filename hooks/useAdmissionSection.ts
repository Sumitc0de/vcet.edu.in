import { useEffect, useState } from 'react';
import type { AdmissionSection } from '../admin/types';
import { admissionsService } from '../services/admissions';

export function useAdmissionSection(slug: string) {
  const [section, setSection] = useState<AdmissionSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await admissionsService.getBySlug(slug);
        if (!cancelled) {
          setSection(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load admission content');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { section, loading, error };
}

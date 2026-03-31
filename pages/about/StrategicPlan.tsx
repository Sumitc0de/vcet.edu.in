import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { FileText, Download, Calendar } from 'lucide-react';
import { getAboutSection } from '../../services/about';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

interface PlanDocument {
  label?: string;
  title?: string;
  year?: string;
  session?: string;
  fileUrl?: string | null;
  file_url?: string | null;
  url?: string | null;
  displayOrder?: number;
  order?: number;
  sortOrder?: number;
  isActive?: boolean;
  active?: boolean;
}

interface StrategicData {
  documents?: PlanDocument[];
}

const StrategicPlan: React.FC = () => {
  const [data, setData] = useState<StrategicData | null>(null);

  useEffect(() => {
    let mounted = true;
    getAboutSection<StrategicData>('strategic-plan')
      .then((res) => mounted && setData(res))
      .catch(() => mounted && setData(null));
    return () => {
      mounted = false;
    };
  }, []);

  const plans = useMemo(() => {
    const docs = (data?.documents ?? [])
      .filter((doc) => (doc.isActive ?? doc.active ?? true) !== false)
      .sort((a, b) => (a.displayOrder ?? a.order ?? a.sortOrder ?? 0) - (b.displayOrder ?? b.order ?? b.sortOrder ?? 0));
    return docs;
  }, [data]);

  return (
    <PageLayout>
      <PageBanner title="Strategic Plan" breadcrumbs={[{ label: 'Strategic Plan' }]} />

      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="reveal text-center mb-8 md:mb-14">
              <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
                <div className="w-8 md:w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Documents</span>
                <div className="w-8 md:w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-navy">Strategic Plans</h2>
              <p className="text-slate-500 mt-2 md:mt-3 max-w-xl mx-auto text-sm md:text-base">
                Strategic plan records managed by the administration.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {plans.map((plan, idx) => {
                const fileHref = resolveUploadedAssetUrl(plan.fileUrl ?? plan.file_url ?? plan.url ?? null);
                return (
                  <a
                    key={`${plan.year ?? plan.session}-${idx}`}
                    href={fileHref ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`reveal group ${fileHref ? '' : 'pointer-events-none opacity-70'}`}
                    style={{ transitionDelay: `${idx * 0.08}s` }}
                  >
                    <div className="flex items-center gap-4 p-5 bg-brand-light rounded-2xl border border-gray-100 hover:border-brand-gold/40 hover:shadow-lg transition-all duration-500 h-full">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <FileText className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-300">{plan.label ?? plan.title ?? ''}</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                          <span className="text-xs text-slate-400">{plan.year ?? plan.session ?? ''}</span>
                        </div>
                      </div>

                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-300">
                        <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default StrategicPlan;

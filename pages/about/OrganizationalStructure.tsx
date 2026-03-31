import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Building2 } from 'lucide-react';
import { getAboutSection } from '../../services/about';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

interface FlatOrgNode {
  name?: string;
  title?: string;
  role?: string;
  parent?: string | null;
  parentId?: string | null;
  parentNode?: string | null;
  displayOrder?: number;
  order?: number;
  sortOrder?: number;
  isActive?: boolean;
  active?: boolean;
}

interface HierarchyNode {
  name: string;
  title: string;
  children?: HierarchyNode[];
}

interface OrgData {
  orgIntro?: string;
  orgChartImage?: string | null;
  orgNodes?: FlatOrgNode[];
}

const OrgCard: React.FC<{ node: HierarchyNode; delay: number }> = ({ node, delay }) => (
  <div className="flex flex-col items-center">
    <div className="reveal group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-gold/30 transition-all duration-500 p-6 text-center min-w-[220px] max-w-[280px]" style={{ transitionDelay: `${delay * 0.1}s` }}>
      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
        <Building2 className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-display font-bold text-brand-navy">{node.name}</h3>
      <p className="text-sm text-brand-gold font-semibold mt-1">{node.title}</p>
    </div>

    {node.children && node.children.length > 0 && (
      <>
        <div className="w-px h-10 bg-gradient-to-b from-brand-gold/50 to-brand-blue/30" />
        <div className="w-3 h-3 rounded-full bg-brand-gold/40 border-2 border-brand-gold -mt-1.5 mb-2" />
        <div className="flex flex-wrap justify-center gap-8">
          {node.children.map((child, idx) => (
            <OrgCard key={`${child.name}-${idx}`} node={child} delay={delay + idx + 1} />
          ))}
        </div>
      </>
    )}
  </div>
);

function normalizeKey(value: string | null | undefined): string {
  return (value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function buildHierarchy(nodes: FlatOrgNode[]): HierarchyNode[] {
  const active = nodes
    .filter((node) => (node.isActive ?? node.active ?? true) !== false && node.name?.trim() && (node.title ?? node.role)?.trim())
    .sort((a, b) => (a.displayOrder ?? a.order ?? a.sortOrder ?? 0) - (b.displayOrder ?? b.order ?? b.sortOrder ?? 0));

  if (active.length === 0) {
    return [{ name: 'Mr. Vikas Vartak', title: 'Chairman', children: [] }];
  }

  const map = new Map<string, HierarchyNode>();
  const roots: HierarchyNode[] = [];

  active.forEach((node) => {
    const name = node.name!.trim();
    const title = (node.title ?? node.role ?? '').trim();
    map.set(normalizeKey(name), { name, title, children: [] });
  });

  active.forEach((node) => {
    const current = map.get(normalizeKey(node.name))!;
    const parentKey = normalizeKey(node.parent ?? node.parentId ?? node.parentNode);

    if (parentKey && map.has(parentKey)) {
      map.get(parentKey)!.children!.push(current);
      return;
    }

    roots.push(current);
  });

  return roots.length > 0 ? roots : [map.values().next().value];
}

const OrganizationalStructure: React.FC = () => {
  const [data, setData] = useState<OrgData | null>(null);

  useEffect(() => {
    let mounted = true;
    getAboutSection<OrgData>('org-structure')
      .then((res) => mounted && setData(res))
      .catch(() => mounted && setData(null));
    return () => {
      mounted = false;
    };
  }, []);

  const hierarchies = useMemo(() => buildHierarchy(data?.orgNodes ?? []), [data]);
  const intro = data?.orgIntro || "The organizational framework of Vidyavardhini's College of Engineering and Technology";
  const orgChartImage = resolveUploadedAssetUrl(data?.orgChartImage ?? null);

  return (
    <PageLayout>
      <PageBanner title="Organizational Structure" breadcrumbs={[{ label: 'Organizational Structure' }]} />

      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="reveal text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Hierarchy</span>
                <div className="w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">Institutional Hierarchy</h2>
              <p className="text-slate-500 mt-3 max-w-xl mx-auto">{intro}</p>
            </div>

            {orgChartImage && (
              <div className="reveal mb-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <img src={orgChartImage} alt="Organizational Chart" className="w-full h-auto object-contain" />
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-10 overflow-x-auto pb-8">
              {hierarchies.map((root, index) => (
                <OrgCard key={`${root.name}-${index}`} node={root} delay={index + 1} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default OrganizationalStructure;

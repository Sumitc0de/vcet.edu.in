import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { FileText, Award, Cpu, Leaf, HeartPulse, Building2, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const pdfPath = '/RESEARCH-CONVENTION.pdf';

const quickInsights = [
  {
    title: 'Institution Profile',
    description:
      "Vidyavardhini's College of Engineering & Technology is NAAC/NBA accredited and affiliated with the University of Mumbai.",
    icon: Building2,
  },
  {
    title: 'Time Span Covered',
    description: 'The convention summary captures key outcomes and project directions across the featured period.',
    icon: FileText,
  },
  {
    title: 'Cross-Domain Innovation',
    description: 'Healthcare, AI/ML, Agri-tech, sustainability, and infrastructure-focused projects are highlighted.',
    icon: Cpu,
  },
  {
    title: 'Verified Achievement',
    description: 'Includes the AVISHKAR university-level silver medal project in shrimp-farm pond aerator control.',
    icon: Award,
  },
];

const keyDomains = [
  {
    title: 'Assistive Tech and Healthcare',
    points: [
      'Lower limb and hand exoskeleton prototypes',
      'Auto wheelchair-cum-bed and smart saline systems',
      'Biodegradable sanitary napkin machine',
    ],
    icon: HeartPulse,
  },
  {
    title: 'Medical AI and ML',
    points: [
      'Diagnostic models for skin disease identification',
      'Diabetic retinopathy screening approaches',
      'Pneumonia assessment using X-ray and voice data',
    ],
    icon: Cpu,
  },
  {
    title: 'Agri-Tech and Sustainability',
    points: [
      'Climate-resilient farming support platforms',
      'Smart water grid concepts under Jal Jeevan context',
      '3D filament extruder from recycled surgical masks',
    ],
    icon: Leaf,
  },
  {
    title: 'Hardware and Infrastructure',
    points: [
      'Solar water heater optimization studies',
      'Low-cost housing panel development',
      'Data center immersion cooling projects',
    ],
    icon: Building2,
  },
];

const pdfRoadmap = [
  'Institution profile and accreditation snapshot',
  'Research themes and implementation focus',
  'Top project evidence and AVISHKAR-level achievement',
];

const heroSnapshots = [
  { label: 'Coverage Window', value: 'Current Research Snapshot' },
  { label: 'Core Domains', value: '4 Priority Tracks' },
  { label: 'Document Focus', value: 'Single Verified PDF' },
];

const ResearchConventions: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Research Conventions"
        breadcrumbs={[
          { label: 'Research', href: '/research' },
          { label: 'Research Conventions' },
        ]}
      />

      <section className="relative py-14 md:py-18 bg-[#0F355B] overflow-hidden border-b border-[#0D2F50]">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[#1f6fb9]/30 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-[#fdb813]/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="reveal lg:col-span-7">
              <span className="inline-block text-[12px] font-bold uppercase tracking-[0.24em] text-[#fdb813] border-b border-[#fdb813]/60 pb-1 mb-5">
                Single Document Experience
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-[1.12] mb-4 tracking-tight">
                Research Highlights and Outcomes
              </h2>
              <p className="text-white/85 text-[16px] md:text-[18px] leading-[1.85] max-w-3xl">
                One focused document. No clutter. This page helps you quickly understand what matters inside
                <strong> RESEARCH-CONVENTION.pdf</strong> before you read every section in detail.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#fdb813] text-[#1a3556] text-[14px] font-bold hover:bg-[#f2ae00] transition-colors"
                >
                  Open PDF
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={pdfPath}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/35 text-white text-[14px] font-semibold bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Download Copy
                </a>
              </div>
            </div>

            <div className="reveal lg:col-span-5 lg:self-stretch" style={{ transitionDelay: '0.08s' }}>
              <div className="h-full flex flex-col gap-4">
                <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-5 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                  <p className="text-[12px] uppercase tracking-[0.16em] font-bold text-[#fdb813] mb-3">Inside The PDF</p>
                  <ul className="space-y-3">
                    {pdfRoadmap.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-white/90 text-[14px] leading-[1.6]">
                        <CheckCircle2 className="w-4 h-4 text-[#fdb813] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/20 bg-[#082745]/80 p-4 md:p-5 shadow-[0_10px_26px_rgba(0,0,0,0.2)]">
                  <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#fdb813] mb-3">At A Glance</p>
                  <div className="space-y-2.5">
                    {heroSnapshots.map((snapshot) => (
                      <div
                        key={snapshot.label}
                        className="flex items-center justify-between gap-3 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2"
                      >
                        <span className="text-[12px] md:text-[13px] text-white/75">{snapshot.label}</span>
                        <span className="text-[12px] md:text-[13px] font-semibold text-white">{snapshot.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="mb-6 reveal">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-[#1a4b7c] tracking-tight">Quick Insights Before You Read</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {quickInsights.map((item, idx) => (
              <article
                key={item.title}
                className="reveal bg-white border border-[#E1E8F2] rounded-xl p-5 shadow-[0_1px_8px_rgba(15,23,42,0.04)] relative overflow-hidden"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#fdb813] to-[#1a4b7c]" />
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1a4b7c]/8 border border-[#1a4b7c]/15 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#1a4b7c]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[#1a4b7c] text-lg mb-1.5">{item.title}</h3>
                    <p className="text-[15px] text-[#4B5563] leading-[1.75]">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18 bg-white border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="mb-8 reveal">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-[#1a4b7c] tracking-tight">Key Research Domains</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {keyDomains.map((domain, idx) => (
              <article
                key={domain.title}
                className="reveal border border-[#E3E8EF] rounded-xl overflow-hidden bg-[#FCFDFE] group hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-shadow duration-300"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <div className="px-5 pt-5 pb-3 flex items-center gap-3 border-b border-[#E8EDF4] bg-white">
                  <div className="w-9 h-9 rounded-lg bg-[#1a4b7c]/8 border border-[#1a4b7c]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1a4b7c]/12 transition-colors">
                    <domain.icon className="w-4.5 h-4.5 text-[#1a4b7c]" />
                  </div>
                  <h4 className="font-display font-bold text-[#1a4b7c] text-lg leading-tight">{domain.title}</h4>
                </div>
                <ul className="px-5 py-4 space-y-2">
                  {domain.points.map((point) => (
                    <li key={point} className="text-[15px] text-[#4B5563] leading-[1.7] flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#fdb813] flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#1a4b7c]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal rounded-xl border border-white/20 bg-white/5 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-[#fdb813]/15 border border-[#fdb813]/35 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-[#fdb813]" />
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-[0.16em] font-bold text-[#fdb813] mb-1">Top Achievement</p>
                <h4 className="text-white font-display font-bold text-xl md:text-2xl leading-tight mb-2">
                  Silver Medal (2nd Rank) - AVISHKAR University Level, 2022-23
                </h4>
                <p className="text-white/85 text-[15px] md:text-[16px] leading-[1.8]">
                  Project: <strong>Optimized Wi-Fi based Control System for Pond Aerators in Shrimp Farming</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-4 flex items-center justify-between gap-4 flex-wrap">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-[#1a4b7c] tracking-tight">Full PDF Viewer</h3>
            <a
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1a4b7c] hover:text-[#163f69]"
            >
              Open in New Tab
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="reveal rounded-2xl border border-[#DCE4F0] overflow-hidden shadow-[0_4px_20px_rgba(15,23,42,0.08)]">
            <div className="h-10 bg-[#F5F8FC] border-b border-[#DCE4F0] px-4 flex items-center justify-between">
              <p className="text-[13px] font-semibold text-[#3F4E63]">RESEARCH-CONVENTION.pdf</p>
              <FileText className="w-4 h-4 text-[#6B7280]" />
            </div>
            <iframe
              src={pdfPath}
              title="Research Convention PDF"
              className="w-full h-[70vh] min-h-[520px] bg-white"
            />
          </div>

          <p className="mt-4 text-[14px] text-[#6B7280]">
            If the preview does not load in your browser, use <span className="font-semibold">Open in New Tab</span> or download the file.
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default ResearchConventions;

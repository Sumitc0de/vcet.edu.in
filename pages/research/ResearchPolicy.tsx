import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  GraduationCap,
  Plane,
  ReceiptIndianRupee,
  Trophy,
  Users,
} from 'lucide-react';

const pdfPath = '/RESEARCH-POLICY.pdf';

const policyTabs = [
  'Sponsorship Framework',
  'OD Leave Norms',
  'Deputation Support',
  'Faculty & Student Incentives',
];

const sponsorshipPoints = [
  {
    title: 'Eligible Activities',
    description: 'Staff members are eligible for sponsorship to attend Short Term Training Programs (STTP), Conferences, and Seminars.',
    icon: Users,
  },
  {
    title: 'Sponsorship Amount',
    description: 'The college provides 50% of the registration fee plus TA/DA and boarding/lodging according to established rules.',
    icon: ReceiptIndianRupee,
  },
  {
    title: 'Annual Limit',
    description: 'The maximum contribution per staff member is Rs. 5,000 per academic year.',
    icon: CalendarDays,
  },
  {
    title: 'On Duty (OD) Leave: Ongoing Semester',
    description: 'Staff members can be sanctioned two days of OD leave per semester.',
    icon: GraduationCap,
  },
  {
    title: 'On Duty (OD) Leave: Semester Breaks',
    description:
      'OD leave is available during breaks, provided the staff member has availed their entire due vacation and completed all allotted departmental and institutional work.',
    icon: CalendarDays,
  },
  {
    title: 'Deputation',
    description:
      'If the institute deputes a staff member for training or workshops, they will receive registration fees, TA/DA, and OD leave as per VCET norms.',
    icon: Plane,
  },
];

const incentives = [
  { category: 'Teachers', recognition: 'International Recognition Award', amount: 'Rs. 15,000' },
  { category: 'Teachers', recognition: 'National Recognition Award', amount: 'Rs. 10,000' },
  { category: 'Teachers', recognition: 'State Recognition Award', amount: 'Rs. 5,000' },
  { category: 'Teachers', recognition: 'International Best Paper Award', amount: 'Rs. 2,000' },
  { category: 'Teachers', recognition: 'National Best Paper Award', amount: 'Rs. 1,000' },
  { category: 'Teachers', recognition: 'Other Agencies Recognition Award', amount: 'Rs. 2,500' },
  { category: 'Students', recognition: 'International Best Paper Award', amount: 'Rs. 1,000' },
  { category: 'Students', recognition: 'National Best Paper Award', amount: 'Rs. 500' },
];

const ResearchPolicy: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Research Policy"
        breadcrumbs={[
          { label: 'Research', href: '/research' },
          { label: 'Research Policy' },
        ]}
      />

      <section className="relative py-14 md:py-18 bg-[#0E355C] overflow-hidden border-b border-[#0A2D4C]">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#fdb813]/25 blur-3xl" />
          <div className="absolute -bottom-12 left-8 w-80 h-80 rounded-full bg-[#2b7dc9]/25 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="reveal lg:col-span-7">
              <span className="inline-block text-[12px] font-bold uppercase tracking-[0.22em] text-[#fdb813] border-b border-[#fdb813]/60 pb-1 mb-5">
                Research Governance
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-[1.1] tracking-tight mb-4">
                Sponsorship Policy for Professional Development
              </h2>
              <p className="text-white/85 text-[16px] md:text-[18px] leading-[1.8] max-w-3xl">
                Effective January 1, 2018, this policy defines sponsorship, OD leave norms, deputation support,
                and recognition incentives for teachers and students.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#fdb813] text-[#1a3556] text-[14px] font-bold hover:bg-[#f2ae00] transition-colors"
                >
                  Open Policy PDF
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={pdfPath}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/35 text-white text-[14px] font-semibold bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Copy
                </a>
              </div>
            </div>

            <div className="reveal lg:col-span-5 lg:self-stretch" style={{ transitionDelay: '0.08s' }}>
              <div className="h-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-5 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)] flex flex-col gap-4">
                <p className="text-[12px] uppercase tracking-[0.16em] font-bold text-[#fdb813]">Policy Capsule</p>
                <div className="rounded-xl border border-white/15 bg-white/[0.04] p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#fdb813]/20 border border-[#fdb813]/45 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4.5 h-4.5 text-[#fdb813]" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-[18px] mb-1">Single Source Policy PDF</h3>
                      <p className="text-[14px] text-white/80 leading-[1.7]">
                        Official institutional policy holder with sponsorship, leave and incentive framework.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-center">
                  <div className="rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5">
                    <p className="text-white/70 text-[11px] uppercase tracking-[0.12em]">Annual Cap</p>
                    <p className="text-white font-bold text-[15px] mt-1">Rs. 5,000</p>
                  </div>
                  <div className="rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5">
                    <p className="text-white/70 text-[11px] uppercase tracking-[0.12em]">OD Leave</p>
                    <p className="text-white font-bold text-[15px] mt-1">2 Days/Sem</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 reveal" style={{ transitionDelay: '0.12s' }}>
            <div className="flex flex-wrap gap-3">
              {policyTabs.map((tab, idx) => (
                <div
                  key={tab}
                  className="relative px-4 py-2.5 text-[12px] md:text-[13px] font-bold uppercase tracking-[0.11em] text-white border border-white/20 bg-white/10 rounded-tl-xl rounded-tr-2xl rounded-br-xl rounded-bl-md shadow-[0_4px_12px_rgba(0,0,0,0.16)]"
                  style={{ transform: `translateY(${idx % 2 === 0 ? '0px' : '2px'})` }}
                >
                  <span className="absolute -top-[1px] -left-[1px] w-6 h-[2px] bg-[#fdb813] rounded-full" />
                  {tab}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-7">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-[#1a4b7c] tracking-tight">
              Policy Clauses and Sponsorship Terms
            </h3>
            <p className="text-[15px] text-[#4B5563] leading-[1.7] mt-2 max-w-3xl">
              The following clauses are displayed exactly for quick reference and administrative clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {sponsorshipPoints.map((item, idx) => (
              <article
                key={item.title}
                className="reveal bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_1px_8px_rgba(15,23,42,0.05)] relative overflow-hidden"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#fdb813] to-[#1a4b7c]" />
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1a4b7c]/8 border border-[#1a4b7c]/15 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#1a4b7c]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[#1a4b7c] text-[18px] mb-1.5 leading-snug">{item.title}</h4>
                    <p className="text-[15px] text-[#4B5563] leading-[1.75]">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-6">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-[#1a4b7c] tracking-tight">
              Incentive Amount Matrix
            </h3>
            <p className="text-[15px] text-[#4B5563] mt-2">
              Recognition-linked incentive amounts for teachers and students.
            </p>
          </div>

          <div className="reveal overflow-x-auto rounded-none border-2 border-[#1a4b7c] shadow-[0_6px_16px_rgba(15,23,42,0.08)]">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="bg-[#1a4b7c] text-white text-left">
                  <th className="px-4 py-3.5 text-[13px] md:text-[14px] uppercase tracking-[0.1em] font-extrabold border-r border-white/25">Category</th>
                  <th className="px-4 py-3.5 text-[13px] md:text-[14px] uppercase tracking-[0.1em] font-extrabold border-r border-white/25">Level of Recognition</th>
                  <th className="px-4 py-3.5 text-[13px] md:text-[14px] uppercase tracking-[0.1em] font-extrabold">Incentive Amount</th>
                </tr>
              </thead>
              <tbody>
                {incentives.map((row, idx) => (
                  <tr
                    key={`${row.category}-${row.recognition}`}
                    className={`border-b border-[#D7DFEA] last:border-b-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F6F9FD]'}`}
                  >
                    <td className="px-4 py-3.5 text-[15px] font-extrabold text-[#1a4b7c] border-r border-[#E3EAF4]">{row.category}</td>
                    <td className="px-4 py-3.5 text-[15px] font-semibold text-[#1F2937] border-r border-[#E3EAF4]">{row.recognition}</td>
                    <td className="px-4 py-3.5 text-[15px] font-extrabold text-[#0f766e]">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="reveal mt-6 rounded-xl border border-[#E8EDF4] bg-[#FCFDFE] p-4 md:p-5" style={{ transitionDelay: '0.06s' }}>
            <div className="flex items-start gap-2.5 text-[14px] md:text-[15px] leading-[1.75] text-[#4B5563]">
              <Trophy className="w-4.5 h-4.5 text-[#f59e0b] mt-1 flex-shrink-0" />
              <p>
                Incentives are released based on verified recognition records and institutional approval under applicable VCET policy norms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-6">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-[#1a4b7c] tracking-tight">
              Research Policy PDF Holder
            </h3>
          </div>
          <div className="reveal bg-white rounded-2xl border border-[#DEE7F1] overflow-hidden shadow-[0_10px_26px_rgba(15,23,42,0.09)]" style={{ transitionDelay: '0.05s' }}>
            <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-3.5 border-b border-[#E5EAF0] bg-[#F9FBFE]">
              <p className="text-[13px] md:text-[14px] font-semibold text-[#1a4b7c]">RESEARCH-POLICY.pdf</p>
              <a
                href={pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1a4b7c] text-white text-[12px] md:text-[13px] font-semibold hover:bg-[#163e68] transition-colors"
              >
                Open in New Tab
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <iframe
              title="Research Policy PDF"
              src={pdfPath}
              className="w-full h-[380px] md:h-[520px]"
            />
          </div>
          <div className="reveal mt-4 flex items-start gap-2.5 text-[13px] md:text-[14px] text-[#6B7280]" style={{ transitionDelay: '0.1s' }}>
            <CheckCircle2 className="w-4 h-4 text-[#1a4b7c] mt-0.5 flex-shrink-0" />
            <p>Place the final policy file at public/RESEARCH-POLICY.pdf for this viewer to load in production.</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ResearchPolicy;

import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Quote, BookOpen, Award, Users, Target } from 'lucide-react';

const highlights = [
  { icon: BookOpen, value: '10+',  label: 'Academic Programs' },
  { icon: Award,    value: '50+',  label: 'University Ranks' },
  { icon: Users,    value: '150+', label: 'Faculty Members' },
  { icon: Target,   value: '80+',  label: 'Research Projects' },
];

const DeanAcademics: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Dean Academic's Desk"
        breadcrumbs={[
          { label: 'Academics', href: '/academics' },
          { label: "Dean Academic's Desk" },
        ]}
      />

      {/* ── Profile + Message ── */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(212,168,67,0.06),transparent_60%)]" />
          <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-[radial-gradient(ellipse_at_bottom_left,rgba(27,58,92,0.04),transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,1) 1px,transparent 1px)',
              backgroundSize: '52px 52px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto">

            {/* Eyebrow */}
            <div className="reveal flex items-center gap-3 mb-10">
              <div className="w-8 h-0.5 bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">
                Message from the Dean Academics
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 items-start">

              {/* ── Profile Card ── */}
              <div className="reveal w-full lg:w-72 flex-shrink-0">
                <div className="sticky top-28">
                  {/* Gold glow border */}
                  <div className="rounded-3xl p-[2.5px] bg-gradient-to-br from-yellow-300 via-brand-gold to-yellow-500 shadow-[0_0_40px_6px_rgba(253,184,19,0.4)]">
                    <div className="bg-white rounded-[22px] overflow-hidden">

                      {/* Photo Placeholder */}
                      <div className="relative w-full overflow-hidden bg-brand-light flex items-center justify-center" style={{ height: '280px' }}>
                        <div
                          className="absolute inset-0 z-10 pointer-events-none"
                          style={{ background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.12) 52%, transparent 68%)' }}
                        />
                        <div className="flex flex-col items-center justify-center gap-3 z-20">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-gold/20 border-2 border-brand-gold/30 flex items-center justify-center">
                            <span className="text-3xl font-display font-extrabold text-brand-navy/40 select-none">DA</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-semibold tracking-wide">Photo Placeholder</p>
                        </div>
                      </div>

                      {/* Info panel */}
                      <div className="px-5 py-4 bg-gradient-to-b from-white to-amber-50/40">
                        {/* Name + badge */}
                        <div className="text-center mb-3">
                          <h3 className="text-xl font-display font-extrabold text-brand-navy leading-tight">
                            Dean Academics
                          </h3>
                          <div className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-400 px-4 py-1.5 rounded-full shadow-md shadow-brand-gold/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-navy/60" />
                            <span className="text-[11px] font-black text-brand-navy uppercase tracking-[0.22em]">Dean Academics</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 font-semibold text-center mb-3 leading-snug">
                          Vidyavardhini's College of Engineering &amp; Technology, Vasai
                        </p>
                        <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent mb-3" />
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="bg-white border border-brand-gold/25 rounded-xl p-3 shadow-sm">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Qualification</p>
                            <p className="text-base font-extrabold text-brand-navy">Ph.D.</p>
                          </div>
                          <div className="bg-white border border-brand-gold/25 rounded-xl p-3 shadow-sm">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Experience</p>
                            <p className="text-base font-extrabold text-brand-navy">15+ Yrs</p>
                          </div>
                          <div className="col-span-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-brand-gold/30 rounded-xl p-3 shadow-sm">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Affiliated To</p>
                            <p className="text-sm font-bold text-brand-navy leading-snug">Mumbai University, Maharashtra</p>
                          </div>
                        </div>
                      </div>

                      {/* Gold shimmer bar */}
                      <div className="h-2 bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Message Content ── */}
              <div className="flex-1 min-w-0">

                {/* Pull-quote card */}
                <div className="reveal relative bg-gradient-to-br from-brand-navy to-brand-blue rounded-2xl p-6 overflow-hidden shadow-lg mb-8">
                  <div className="absolute -top-2 right-4 opacity-[0.06] select-none pointer-events-none">
                    <Quote className="w-24 h-24 text-white" />
                  </div>
                  <Quote className="w-6 h-6 text-brand-gold mb-3" />
                  <p className="text-lg md:text-xl font-display font-semibold text-white leading-relaxed">
                    Academic excellence is the cornerstone of holistic development and the catalyst for innovation.
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-6 h-px bg-brand-gold/60" />
                    <p className="text-xs font-semibold text-brand-gold/90 tracking-wide">Dean Academics, VCET</p>
                  </div>
                </div>

                {/* Prose */}
                <div className="reveal space-y-4 text-slate-700 leading-[1.85] text-[15px]" style={{ transitionDelay: '0.1s' }}>
                  <p>
                    At Vidyavardhini's College of Engineering and Technology, we are deeply committed
                    to fostering academic excellence and nurturing a culture of continuous learning.
                    Our academic framework is designed to equip students with not just theoretical
                    knowledge, but also the practical skills and critical thinking abilities needed
                    to excel in today's dynamic world.
                  </p>
                  <p>
                    We have established a robust teaching-learning ecosystem supported by
                    ICT-enabled classrooms, well-equipped laboratories, and a dedicated faculty
                    team. Our curriculum is regularly updated in consultation with industry experts
                    to ensure relevance and alignment with emerging trends in technology and
                    engineering.
                  </p>
                  <p>
                    The institution places great emphasis on{' '}
                    <strong className="font-semibold text-brand-blue">outcome-based education (OBE)</strong>{' '}
                    and follows a structured approach to achieve program outcomes and course outcomes.
                    We encourage project-based learning, research activities, and participation in
                    national and international conferences to broaden our students' academic horizons.
                  </p>
                  <p>
                    Our mentoring programs ensure personalized attention to every student, helping
                    them overcome academic challenges and reach their full potential. We also
                    promote interdisciplinary learning through{' '}
                    <strong className="font-semibold text-brand-blue">Honours and Minor degree programs</strong>,
                    NPTEL courses, and various skill development initiatives.
                  </p>
                </div>

                {/* Closing quote */}
                <div className="reveal mt-8" style={{ transitionDelay: '0.2s' }}>
                  <div className="bg-brand-light border border-brand-gold/20 rounded-2xl px-7 py-5 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-brand-gold to-brand-blue" />
                    <p className="text-slate-700 leading-[1.85] text-[15px] italic">
                      "I invite all students, faculty, and stakeholders to join hands in our mission
                      of academic excellence. Together, we can create a vibrant learning community
                      that inspires innovation and shapes future leaders."
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-8 h-0.5 bg-brand-gold" />
                      <div>
                        <p className="font-display font-bold text-brand-navy text-sm">Dean Academics</p>
                        <p className="text-xs text-brand-gold font-semibold">Vidyavardhini's College of Engineering &amp; Technology</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights Strip ── */}
      <section className="py-14 bg-gradient-to-r from-brand-dark via-brand-blue to-brand-navy">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {highlights.map((h, i) => (
                <div
                  key={h.label}
                  className="reveal flex flex-col items-center text-center"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center mb-3 ring-1 ring-white/10">
                    <h.icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <p className="text-white font-display font-bold text-2xl">{h.value}</p>
                  <p className="text-white/60 text-sm mt-1 tracking-wide">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DeanAcademics;

import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { BookOpen, Users, Monitor, Briefcase, Target, Award, Lightbulb, Wrench } from 'lucide-react';

const trainingPrograms = [
  {
    icon: Users,
    title: 'Soft Skills Development',
    description: 'Communication skills, presentation techniques, group discussions, team building, and leadership training to enhance professional competence.',
  },
  {
    icon: Monitor,
    title: 'Aptitude Training',
    description: 'Comprehensive aptitude training covering quantitative ability, logical reasoning, verbal ability, and data interpretation for placement readiness.',
  },
  {
    icon: Wrench,
    title: 'Technical Workshops',
    description: 'Hands-on technical workshops on emerging technologies, programming languages, tools, and frameworks relevant to industry requirements.',
  },
  {
    icon: Briefcase,
    title: 'Mock Interviews',
    description: 'Regular mock interview sessions with industry professionals to prepare students for actual placement interviews.',
  },
  {
    icon: BookOpen,
    title: 'Resume Building',
    description: 'Guidance on crafting effective resumes, cover letters, and LinkedIn profiles that stand out to recruiters.',
  },
  {
    icon: Target,
    title: 'Industry Certifications',
    description: 'Facilitating industry-recognized certifications from Google, AWS, Microsoft, Cisco, and other leading technology companies.',
  },
];

const stats = [
  { icon: Users, value: '1000+', label: 'Students Trained Annually' },
  { icon: Briefcase, value: '50+', label: 'Training Sessions' },
  { icon: Award, value: '20+', label: 'Industry Partners' },
  { icon: Lightbulb, value: '15+', label: 'Certification Programs' },
];

const trainingHighlights = [
  'Year-round training calendar aligned with placement cycles',
  'Dedicated training team with industry-experienced trainers',
  'Training needs assessment based on industry trends and feedback',
  'Personalized training tracks for different career aspirations',
  'Assessment and feedback mechanism for continuous improvement',
  'Bridge courses for students from diverse academic backgrounds',
  'Online resources and practice platforms for self-paced learning',
  'Guest sessions by industry leaders and successful alumni',
];

const sidebarLinks = [
  { id: 'training',  label: 'Training', icon: 'ph-chalkboard-teacher' },
  { id: 'events',    label: 'Events', icon: 'ph-calendar-star' },
  { id: 'career',    label: 'Career Guidance', icon: 'ph-compass' },
  { id: 'internship',label: 'Internship', icon: 'ph-briefcase' },
  { id: 'gallery',   label: 'Gallery', icon: 'ph-image' },
];

const Training: React.FC = () => {
  const [activeId, setActiveId] = React.useState('training');
  const activeLink = sidebarLinks.find(l => l.id === activeId);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
    }, 50);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [activeId]);

  return (
    <PageLayout>
      <PageBanner
        title="Training"
        breadcrumbs={[
          { label: 'Training' },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 px-6 lg:px-12 py-12">
        {/* Sticky Sidebar */}
        <aside className="w-full lg:w-[320px] flex-shrink-0">
          <div className="sticky top-28 bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden border border-slate-200">
            <nav className="flex flex-col py-2">
              {sidebarLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveId(link.id)}
                    className={`px-6 py-4 text-[15px] text-left transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#183a68] text-[#f2a900] font-semibold'
                          : 'text-[#183a68] font-medium hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <i className={`ph ${link.icon} text-xl ${ isActive ? '' : 'opacity-70'}`} />
                      {link.label}
                    </span>
                    {isActive && (
                      <i className="ph ph-arrow-right text-sm transform group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full min-w-0">
          
          {/* Training Tab */}
          {activeId === 'training' && (
            <section className="reveal bg-white rounded-2xl p-8 lg:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#183a68] border-b border-slate-100 pb-3 mb-6">Training</h3>
                <p>
                  To gear-up the students for facing the recruitment process successfully, an extensive pre-placement training on aptitude, group discussions, interviews and presentation is offered to the students. The various measures taken in line with this are:
                </p>
                <div className="mt-8">
                  <ul className="list-disc pl-5 space-y-3">
                    <li>Scheduling of pre-placement training programs in conjunction with academic schedule</li>
                    <li>Conducting Aptitude Development training sessions right from the third year of UG program</li>
                    <li>Collaborating with leading training agencies like IMS, Campus credential, Career Launcher for conduction of Aptitude Development training &amp; Soft skills development to provide high-quality training by seasoned trainers experienced in corporate education.</li>
                    <li>Conducting technical and domain specific training sessions</li>
                    <li>Orientation of students on core companies opportunities and preparations required for placements.</li>
                    <li>Identification of students&apos; soft skills and Aptitude development/training needs and provide additional sessions either through external/internal resources.</li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Placeholders for other tabs */}
          {activeId !== 'training' && (
            <section className="reveal bg-white rounded-2xl p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                <i className={`ph ${activeLink?.icon ?? 'ph-folder'} text-3xl text-[#183a68]`} />
              </div>
              <h3 className="text-xl font-bold text-[#183a68] mb-2">{activeLink?.label}</h3>
              <p className="text-slate-500">Content for this section is coming soon.</p>
            </section>
          )}

        </main>
      </div>
    </PageLayout>
  );
};

export default Training;

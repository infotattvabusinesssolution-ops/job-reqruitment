import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiUserGroup, HiClipboardList, HiAcademicCap, HiOfficeBuilding, HiArrowRight, HiIdentification, HiArrowLeft } from 'react-icons/hi';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6 }
};

const InternshipPrograms = () => {
  const highlights = [
    {
      title: 'Mentored Project Delivery',
      desc: 'Work on actual commercial products with code reviews and mentoring from senior software leads and product managers.',
      icon: HiClipboardList,
      bg: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Enterprise Partnerships',
      desc: 'Our internships are co-designed and sponsored by partner technology enterprises looking to convert interns to full-time staff.',
      icon: HiOfficeBuilding,
      bg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Full-Time Conversion (PPO) Tracks',
      desc: 'Over 75% of our high-performing interns secure Pre-Placement Offers (PPOs) before their internship completion date.',
      icon: HiAcademicCap,
      bg: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Official Internship Certification',
      desc: 'Earn industry-recognized experience credentials and reference recommendations detailing your contributions and technologies mastered.',
      icon: HiIdentification,
      bg: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen text-left">
      <Helmet>
        <title>Internship Programs - Geo India Limited</title>
        <meta name="description" content="Gain practical industry experience with our co-sponsored internship programs. Work on live projects, get mentorship, and secure placement assurances." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-orange-950 text-white py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.15),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div>
            <Link
              to="/job-seekers"
              className="inline-flex items-center text-xs font-bold text-white/70 hover:text-white transition-colors gap-1.5 group"
            >
              <HiArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" /> Back to Job Seekers
            </Link>
          </div>
          <div className="inline-flex items-center px-3.5 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-255 text-[10px] font-bold tracking-widest uppercase">
            Start Your Career
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold max-w-3xl leading-tight">
            Launch Your Journey with Co-Sponsored <span className="text-amber-400">Internship Programs</span>
          </h1>
          <p className="text-base sm:text-lg text-amber-100 max-w-2xl leading-relaxed">
            Gain real-world credentials. Join practical, project-focused internships co-designed with top enterprises to transition you directly into full-time roles.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Intro */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp} className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary-900">
              Transform Tech Knowledge into Production Experience
            </h2>
            <p className="text-xs sm:text-sm text-secondary-650 leading-relaxed font-semibold">
              The first job is often the hardest to secure due to the "experience paradox." Employers seek candidates with experience, but candidates require jobs to gain experience.
            </p>
            <p className="text-xs sm:text-sm text-secondary-650 leading-relaxed">
              At Geo India Limited, we resolve this paradox by placing interns on co-sponsored commercial projects. You work within an agile scrum team, write production code, participate in sprint meetings, and ship actual client features under professional supervision.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="bg-white p-8 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden flex flex-col justify-center min-h-[300px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-12 -mt-12 pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <span className="text-3xl">🌟</span>
              <h3 className="text-lg font-bold text-secondary-900">Pre-Placement Opportunities</h3>
              <p className="text-xs text-secondary-500 leading-relaxed font-medium">
                Our sponsoring companies use our internship cohorts as their primary recruitment pipeline. Perform exceptionally, and secure your full-time job offer before graduation.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Highlights Grid */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary-900">Core Focus Areas</h2>
            <p className="text-xs text-secondary-500 font-semibold">Key structured elements that make our internships highly valued by recruiters.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className={`w-12 h-12 shrink-0 ${item.bg} rounded-2xl flex items-center justify-center`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-secondary-900 text-sm">{item.title}</h3>
                  <p className="text-[11px] text-secondary-500 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-amber-600 to-orange-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-32 -mb-32 pointer-events-none" />
          <div className="space-y-3 max-w-xl z-10 text-center md:text-left">
            <h2 className="text-2xl font-bold">Apply for the Next Internship Cohort</h2>
            <p className="text-xs sm:text-sm text-amber-100 font-semibold">
              Applications are reviewed monthly. Secure your spot in our upcoming tech or management sprint.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-8 py-4 bg-white hover:bg-amber-50 text-amber-800 font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap flex items-center gap-2 group z-10"
          >
            Submit Internship Application <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>

      </div>
    </div>
  );
};

export default InternshipPrograms;

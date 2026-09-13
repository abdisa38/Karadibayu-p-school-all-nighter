import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { KaradibayuSchoolLogo } from '../../components/logo/KaradibayuSchoolLogo.js';
import { Button } from '../../components/common/Button.js';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      {/* Institutional Top Header */}
      <header className="bg-brand-950 border-b border-brand-900 text-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <KaradibayuSchoolLogo size="md" variant="full" theme="dark" />
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="teal"
                size="sm"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In to Portal
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-brand-900 text-white py-16 sm:py-24 border-b border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-800/80 border border-brand-700 text-teal-300 text-xs font-semibold mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Institutional Information & Academic System</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight leading-tight mb-6">
              Empowering Excellence in Primary Education
            </h1>

            <p className="text-base sm:text-lg text-surface-200 leading-relaxed mb-8">
              Karadibayu Primary School Management System provides a unified, secure platform for
              academic governance, continuous assessment, student progress tracking, and institutional administration.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/login">
                <Button
                  variant="teal"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Enter Portal
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white/40 hover:bg-brand-800"
                >
                  System Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Metadata & Pillars */}
      <section className="py-16 bg-white border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-surface-200 bg-surface-50/50">
              <div className="w-10 h-10 rounded-md bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-900 mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-brand-900 mb-2">
                Configurable Assessment
              </h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Supports continuous assessment (quizzes, homework, midterm) and final examinations aligned with Ethiopian curriculum standards.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-surface-200 bg-surface-50/50">
              <div className="w-10 h-10 rounded-md bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-800 mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-brand-900 mb-2">
                Academic Integrity & Verification
              </h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Multi-stage result verification and approval workflows for teachers, department heads, and academic coordinators.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-surface-200 bg-surface-50/50">
              <div className="w-10 h-10 rounded-md bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-800 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-brand-900 mb-2">
                Role-Based Governance
              </h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Strict separation of concerns across Super Admins, Administrators, Academic Coordinators, Teachers, Students, and Parents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Profile Summary */}
      <section className="py-12 bg-surface-100 border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-6 border border-surface-200 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Institutional Profile
              </span>
              <h4 className="text-lg font-bold text-surface-900">
                Karadibayu Primary School
              </h4>
              <div className="flex flex-wrap items-center gap-4 text-xs text-surface-600">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-surface-400" />
                  East Shewa Zone &bull; Oromia &bull; Ethiopia
                </span>
                <span className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-surface-400" />
                  Code: KD-PRI-ETH-001
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-surface-400" />
                  Academic Session: 2018 E.C. (2025/2026 G.C.)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                System Core Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 bg-brand-950 text-white text-xs border-t border-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <KaradibayuSchoolLogo size="sm" variant="full" theme="dark" />
          <span className="text-surface-400">
            Karadibayu Primary School &copy; {new Date().getFullYear()} &mdash; Institutional Information System
          </span>
        </div>
      </footer>
    </div>
  );
};

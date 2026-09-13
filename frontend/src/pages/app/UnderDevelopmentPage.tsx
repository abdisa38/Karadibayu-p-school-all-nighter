import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Construction, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader.js';
import { Badge } from '../../components/common/Badge.js';
import { Button } from '../../components/common/Button.js';

interface ModuleRoadmapMeta {
  title: string;
  description: string;
  phase: number;
  expectedDelivery: string;
  scope: string[];
}

const moduleRoadmap: Record<string, ModuleRoadmapMeta> = {
  '/classes': {
    title: 'Classes & Grades Management',
    description: 'Structure Grade 1 through Grade 8 sections, streams, and homeroom allocations.',
    phase: 3,
    expectedDelivery: 'Phase 3: Academic Structure',
    scope: ['Grade definitions', 'Section allocations', 'Classroom assignments', 'Homeroom teacher mapping'],
  },
  '/subjects': {
    title: 'Curriculum & Subjects Registry',
    description: 'National and regional primary curriculum definitions, credit hours, and subject allocations.',
    phase: 3,
    expectedDelivery: 'Phase 3: Academic Structure',
    scope: ['Subject codes & titles', 'Department structures', 'Curriculum standards', 'Teacher assignment matrix'],
  },
  '/academic-calendar': {
    title: 'Academic Calendar & Terms',
    description: 'Ethiopian calendar alignment, term dates, examination weeks, and school breaks.',
    phase: 3,
    expectedDelivery: 'Phase 3: Academic Structure',
    scope: ['Academic Year configuration', 'Term division rules', 'Institutional holidays', 'Enrollment deadlines'],
  },
  '/students': {
    title: 'Student Information & Registry',
    description: 'Comprehensive student registry, admissions, unique identification, and enrollment history.',
    phase: 3,
    expectedDelivery: 'Phase 3: Core Registries',
    scope: ['Student profile & demographics', 'Parent/guardian linking', 'Enrollment & section assignment', 'Emergency contact records'],
  },
  '/teachers': {
    title: 'Faculty & Teacher Management',
    description: 'Teacher profiles, qualifications, department appointments, and teaching loads.',
    phase: 2,
    expectedDelivery: 'Phase 2: User Management',
    scope: ['Teacher credentials & employment', 'Subject authorizations', 'Schedule allocations', 'Staff directory'],
  },
  '/parents': {
    title: 'Parents & Guardians Directory',
    description: 'Family communication, student guardianship verification, and contact portals.',
    phase: 3,
    expectedDelivery: 'Phase 3: Core Registries',
    scope: ['Guardian verification', 'Multi-child family link', 'Contact preferences', 'Portal access permissions'],
  },
  '/assessments': {
    title: 'Continuous Assessment (CA)',
    description: 'Configurable ongoing assessment components: quizzes, tests, homework, and practical tasks.',
    phase: 4,
    expectedDelivery: 'Phase 4: Examination Engine',
    scope: ['Assessment weight definitions', 'Score entry grids', 'Verification workflows', 'Grade validation'],
  },
  '/examinations': {
    title: 'Examinations Management',
    description: 'Midterm and final term examination scheduling, paper moderation, and score recording.',
    phase: 4,
    expectedDelivery: 'Phase 4: Examination Engine',
    scope: ['Exam timetabling', 'Invigilation schedules', 'Score entry & locking', 'Head-of-department verification'],
  },
  '/report-cards': {
    title: 'Academic Report Cards & Transcripts',
    description: 'Official terminal and annual report cards, grading scales, teacher remarks, and rankings.',
    phase: 4,
    expectedDelivery: 'Phase 4: Examination Engine',
    scope: ['Grade point calculations', 'Conduct evaluations', 'Principal endorsements', 'Printable institutional transcripts'],
  },
  '/attendance': {
    title: 'Attendance Registry',
    description: 'Daily attendance monitoring for students and staff with institutional absence tracking.',
    phase: 5,
    expectedDelivery: 'Phase 5: Operations',
    scope: ['Daily homeroom roll-call', 'Subject session attendance', 'Leave requests', 'Attendance percentage metrics'],
  },
  '/announcements': {
    title: 'Institutional Announcements',
    description: 'Official school broadcasts, parental notices, and faculty circulars.',
    phase: 5,
    expectedDelivery: 'Phase 5: Operations',
    scope: ['Targeted audience broadcasts', 'Emergency alerts', 'Document attachments', 'Read confirmations'],
  },
  '/audit-logs': {
    title: 'System Audit Logs',
    description: 'Tamper-evident logs of institutional record changes, score modifications, and logins.',
    phase: 5,
    expectedDelivery: 'Phase 5: Governance',
    scope: ['Score change audit trail', 'User session auditing', 'Data export records', 'Administrative overrides'],
  },
  '/settings': {
    title: 'Institutional School Settings',
    description: 'Global school parameters, grading policies, academic weight ratios, and institutional branding.',
    phase: 5,
    expectedDelivery: 'Phase 5: Governance',
    scope: ['School profile settings', 'Assessment calculation formulas', 'Role permissions management', 'Database backups'],
  },
};

export const UnderDevelopmentPage: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const meta = moduleRoadmap[currentPath] || {
    title: 'Subsystem Module',
    description: 'This institutional subsystem is part of the planned rollout roadmap.',
    phase: 2,
    expectedDelivery: 'Upcoming Development Phase',
    scope: ['Specification defined', 'Database schema in development', 'API endpoints pending'],
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={meta.title}
        subtitle="This institutional module is registered in the system architecture and scheduled for phased implementation."
        badge={
          <Badge variant="brand" size="md">
            Phase {meta.phase} Scheduled
          </Badge>
        }
      />

      <div className="max-w-3xl mx-auto bg-white rounded-lg border border-surface-200 shadow-subtle p-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-14 h-14 rounded-lg bg-surface-100 border border-surface-200 flex items-center justify-center text-surface-600 shrink-0">
            <Construction className="w-7 h-7 text-brand-900" />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1 justify-center sm:justify-start">
                <h2 className="text-lg font-bold text-brand-900">{meta.title}</h2>
                <Badge variant="teal">{meta.expectedDelivery}</Badge>
              </div>
              <p className="text-xs text-surface-600 leading-relaxed">{meta.description}</p>
            </div>

            <div className="p-4 bg-surface-50 rounded-md border border-surface-200 space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-700">
                Scheduled Engineering Scope:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-surface-600">
                {meta.scope.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
              <Link to="/dashboard">
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

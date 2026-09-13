import { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';

export class SystemController {
  public static getSchoolProfile(_req: Request, res: Response): void {
    const profile = {
      schoolName: 'Karadibayu Primary School',
      motto: 'Knowledge, Character, and Institutional Excellence',
      institutionCode: 'KD-PRI-ETH-001',
      location: {
        country: 'Ethiopia',
        region: 'Oromia',
        zone: 'East Shewa',
        woreda: 'Adaa / Karadibayu',
      },
      academicCalendar: {
        currentAcademicYear: '2018 E.C. (2025/2026 G.C.)',
        currentTerm: 'Term 1',
        systemType: 'Configurable Ethiopian Primary Academic Standard',
        gradeLevels: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'],
      },
      modulesStatus: [
        { id: 'foundation', name: 'System Architecture & Shell', status: 'COMPLETED', phase: 1 },
        { id: 'auth_security', name: 'Authentication & RBAC', status: 'FOUNDATION_READY', phase: 2 },
        { id: 'user_management', name: 'User & Staff Management', status: 'PENDING_NEXT_PHASE', phase: 2 },
        { id: 'student_management', name: 'Student Registry & Enrollment', status: 'PENDING', phase: 3 },
        { id: 'academic_structure', name: 'Academic Years, Grades & Classes', status: 'PENDING', phase: 3 },
        { id: 'assessments', name: 'Continuous Assessments & Examinations', status: 'PENDING', phase: 4 },
        { id: 'results_grading', name: 'Result Calculation & Report Cards', status: 'PENDING', phase: 4 },
        { id: 'attendance', name: 'Daily & Session Attendance', status: 'PENDING', phase: 5 },
        { id: 'audit_settings', name: 'Audit Logs & Institutional Settings', status: 'PENDING', phase: 5 },
      ],
    };

    ApiResponse.success(res, 'Institutional metadata retrieved successfully', profile);
  }
}

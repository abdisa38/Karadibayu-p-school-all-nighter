export const UserRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  ACADEMIC_COORDINATOR: 'ACADEMIC_COORDINATOR',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export interface AuthUser {
  id: string;
  email: string;
  role: UserRoleType;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export interface ApiResponseEnvelope<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    timestamp: string;
    [key: string]: unknown;
  };
  errors?: unknown;
}

export interface SystemHealthData {
  status: 'HEALTHY' | 'DEGRADED';
  name: string;
  version: string;
  environment: string;
  timestamp: string;
  uptime: {
    seconds: number;
    formatted: string;
  };
  database: {
    isConnected: boolean;
    readyState: number;
    stateLabel: string;
    host?: string;
    name?: string;
  };
  system: {
    nodeVersion: string;
    platform: string;
    memory: {
      rssMb: number;
      heapTotalMb: number;
      heapUsedMb: number;
    };
  };
}

export interface SchoolProfileData {
  schoolName: string;
  motto: string;
  institutionCode: string;
  location: {
    country: string;
    region: string;
    zone: string;
    woreda: string;
  };
  academicCalendar: {
    currentAcademicYear: string;
    currentTerm: string;
    systemType: string;
    gradeLevels: string[];
  };
  modulesStatus: Array<{
    id: string;
    name: string;
    status: 'COMPLETED' | 'FOUNDATION_READY' | 'PENDING_NEXT_PHASE' | 'PENDING';
    phase: number;
  }>;
}

export interface NavItem {
  label: string;
  path: string;
  iconName: string;
  roles?: UserRoleType[];
  badge?: string;
  children?: Array<{
    label: string;
    path: string;
  }>;
}

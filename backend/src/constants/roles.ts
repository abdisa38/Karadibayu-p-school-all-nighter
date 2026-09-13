export const UserRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  ACADEMIC_COORDINATOR: 'ACADEMIC_COORDINATOR',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export const ALL_ROLES: UserRoleType[] = [
  UserRole.SUPER_ADMIN,
  UserRole.ADMIN,
  UserRole.ACADEMIC_COORDINATOR,
  UserRole.TEACHER,
  UserRole.STUDENT,
  UserRole.PARENT,
];

export const RoleHierarchy: Record<UserRoleType, number> = {
  [UserRole.SUPER_ADMIN]: 100,
  [UserRole.ADMIN]: 80,
  [UserRole.ACADEMIC_COORDINATOR]: 60,
  [UserRole.TEACHER]: 40,
  [UserRole.STUDENT]: 20,
  [UserRole.PARENT]: 10,
};

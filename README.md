# Karadibayu Primary School Management System

**Academic Information & Institutional Management System**  
*Configured for Primary Education in Ethiopia (Oromia Regional Standards)*

---

## System Overview
The Karadibayu Primary School Management System is a production-oriented institutional web application designed for academic administration, continuous assessment, teacher assignments, student record governance, and report card generation.

This system is built with strict enterprise engineering guidelines:
- **Zero Mock Business Data**: System telemetry, academic structure, and institutional registers are queried directly from the backend service.
- **Zero Emojis**: Rigorous institutional aesthetic with Lucide React vector icons and custom SVG heraldry.
- **Strict Role-Based Access Control**: Foundations for Super Admin, Admin, Academic Coordinator, Teacher, Student, and Parent.
- **Security-First Architecture**: Secrets isolation, Helmet security headers, CORS origin whitelisting, rate limiting, and Zod request validation.

---

## Architectural Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with central design tokens (Deep Institutional Blue `#0f294a`, Restrained Academic Teal `#0f766e`, Subtle Warm Gold `#d97706`, Neutral Slate `#f8fafc`)
- **Routing**: React Router 7 with route guards and layout nesting
- **Server State**: TanStack Query (React Query)
- **Forms & Validation**: React Hook Form + Zod
- **Icons**: Lucide React
- **Brand Assets**: Custom SVG Scalable School Crest (`KaradibayuSchoolLogo.tsx`)

### Backend
- **Runtime**: Node.js (v24+) + Express.js
- **Language**: TypeScript with strict type-safety
- **Database**: MongoDB Atlas with Mongoose ODM (resilient connection manager with health status probe)
- **Security**: Helmet, CORS, Express Rate Limit, Cookie Parser
- **Validation**: Zod request schema validation (body, params, query)
- **Logging**: Winston structured logger with Morgan HTTP request integration
- **Authentication/Authorization**: JWT access/refresh token architecture, bcryptjs password hashing, role-based access control middleware

---

## Project Structure
```
Karadibayu-p-school-all-nighter/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment & Resilient MongoDB Connection Manager
│   │   ├── constants/       # Role enums, HTTP status codes
│   │   ├── controllers/     # Health, Auth, and System Telemetry Controllers
│   │   ├── middleware/      # Error handler, request logger, auth, rbac, rate limiter
│   │   ├── routes/          # Health, Auth, System and v1 API router
│   │   ├── types/           # API response envelopes, user contexts
│   │   ├── utils/           # ApiResponse, ApiError, Winston logger, Security utilities
│   │   ├── validation/      # Zod validation schemas
│   │   └── server.ts        # Express server bootstrap & graceful shutdown
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/      # Button, Badge, Skeleton, Spinner, EmptyState, ErrorState
│   │   │   ├── feedback/    # Accessible Modal, ConfirmDialog, Toast notification stack
│   │   │   ├── forms/       # FormField, Input, Select, Textarea, Checkbox
│   │   │   ├── layout/      # AppLayout, Sidebar, TopNav, Breadcrumbs, PageHeader, PageContainer
│   │   │   ├── logo/        # Karadibayu Primary School SVG heraldic crest
│   │   │   └── table/       # Generic Institutional DataTable (sorting, pagination, search)
│   │   ├── context/         # AuthContext, ToastContext
│   │   ├── hooks/           # useToast, useDebounce
│   │   ├── pages/
│   │   │   ├── public/      # LandingPage (/), LoginPage (/login), ForgotPassword (/forgot-password)
│   │   │   ├── app/         # DashboardPage (/dashboard), UnderDevelopmentPage
│   │   │   └── errors/      # NotFoundPage (404)
│   │   ├── routes/          # AppRoutes
│   │   ├── services/        # Axios API client
│   │   ├── styles/          # Tailwind CSS & design tokens
│   │   └── types/           # Frontend TypeScript models
│   └── package.json
│
└── package.json             # Root workspace orchestrator
```

---

## Installation & Running

### 1. Install Dependencies
```bash
# In backend directory
cd backend
npm install

# In frontend directory
cd ../frontend
npm install
```

### 2. Environment Configuration
Inspect `backend/.env` and update values if connecting to MongoDB Atlas:
```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000
MONGODB_URI=mongodb://127.0.0.1:27017/karadibayu_school_db
JWT_SECRET=your_super_secret_jwt_key_min32chars
JWT_REFRESH_SECRET=your_refresh_secret_key_min32chars
```

### 3. Run Development Servers
```bash
# Terminal 1: Start Backend API (runs on port 5000)
cd backend
npm run dev

# Terminal 2: Start Frontend (runs on port 5173)
cd frontend
npm run dev
```

### 4. Default Test Credentials
- **Email**: `admin@karadibayu.edu.et`
- **Password**: `Karadibayu@2026`
- **Role**: `SUPER_ADMIN`

---

## Multi-Phase Roadmap
- [x] **Phase 1**: System Architecture Foundation, UI Component System, Express API, Resilient DB Connection, Security Suite.
- [ ] **Phase 2**: User Management, Faculty & Staff Directory, Full Database-backed Authentication.
- [ ] **Phase 3**: Academic Structure (Grades 1-8, Classes, Subjects), Student & Guardian Registries.
- [ ] **Phase 4**: Continuous Assessment (CA) Engine, Examination Scheduling, Report Cards & Calculation Rules.
- [ ] **Phase 5**: Daily Attendance Tracking, Audit Logs, School Broadcasts & Institutional Settings.

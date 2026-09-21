# AI Job Application Assistant

An AI-powered full-stack application that helps job seekers analyze their resume against a job description and receive structured insights, skill-gap analysis, match scoring, and personalized recommendations.

## 🚧 Project Status

**Status: In Development — Core Application Functional**

The project is being developed incrementally as a practical Fullstack AI Engineering project.

### ✅ Completed

#### Project Setup

- [x] Git repository and project structure
- [x] Next.js frontend setup
- [x] Node.js + TypeScript backend
- [x] PostgreSQL database
- [x] Environment configuration

#### Backend

- [x] REST API with Express
- [x] Controllers and service-layer architecture
- [x] PostgreSQL data modelling
- [x] Zod request validation
- [x] Centralized error handling
- [x] Async request handling

#### Authentication & Authorization

- [x] User authentication
- [x] Password hashing with bcrypt
- [x] JWT-based authentication
- [x] HttpOnly cookie-based web sessions
- [x] Protected API routes
- [x] User-specific resource authorization
- [x] Resume ownership protection
- [x] Job ownership protection
- [x] Analysis ownership protection

#### Resume & Job Management

- [x] Resume creation and management
- [x] Job creation and management
- [x] User-specific resume access
- [x] User-specific job access

#### AI Integration

- [x] AI provider abstraction
- [x] Gemini integration
- [x] OpenAI provider integration
- [x] Mock AI provider for development/testing
- [x] Structured AI responses using Zod
- [x] AI service error handling
- [x] Explainable match-score breakdown
- [x] Backend-calculated match score
- [x] Skills matching
- [x] Missing skills identification
- [x] Strengths and weaknesses analysis
- [x] Personalized recommendations

#### Testing

- [x] Jest testing setup
- [x] Initial service unit tests
- [x] Frontend validation and authentication flow verification
- [x] Protected route and session restoration verification
- [ ] Comprehensive frontend automated test coverage
- [ ] Comprehensive backend test coverage

## 🧪 Frontend Validation Status

The following frontend flows have been manually verified:

- [x] Registration validation
- [x] Login validation
- [x] Resume required-field validation
- [x] Job required-field validation
- [x] Analysis resume/job selection validation
- [x] Disabled submit states
- [x] Logout flow
- [x] Protected dashboard behavior
- [x] Session restoration after refresh
- [x] Unauthorized access handling
- [x] Empty states and empty-state actions

Frontend validation complements backend Zod validation. The backend remains the authoritative validation layer for API requests.

## 🔨 Currently In Progress

### Frontend Application

- [x] Frontend architecture
- [x] Authentication UI
- [x] API client
- [x] User registration
- [x] Login and session management
- [x] Resume management UI
- [x] Job management UI
- [x] AI analysis workflow
- [x] Analysis results dashboard
- [x] Dashboard activity overview
- [x] Read-only user profile
- [x] Shared frontend UI components
- [x] Frontend validation and error handling
- [ ] Frontend automated testing
- [ ] Final responsive/production review

## 📋 Planned

### RAG

- [ ] Embeddings
- [ ] Vector database
- [ ] Resume/project knowledge base
- [ ] Semantic search
- [ ] Retrieval-augmented analysis

### AI Agent

- [ ] Agent architecture
- [ ] Tool calling
- [ ] Multi-step job application workflow
- [ ] Agent safety and controls

### Security

- [ ] File validation
- [ ] API security hardening
- [ ] Prompt-injection protection
- [ ] AI-specific security controls
- [ ] Production secrets management

### DevOps

- [ ] Docker application containers
- [ ] Docker Compose
- [ ] GitHub Actions
- [ ] Automated build checks
- [ ] Automated test pipeline
- [ ] Deployment

### Portfolio

- [ ] Architecture diagram
- [ ] API documentation
- [ ] Application screenshots
- [ ] Demo
- [ ] Technical documentation

---

## 🔄 Current User Workflow

```text
Register / Login
      ↓
Dashboard
      ↓
Save Resume
      ↓
Save Job
      ↓
Select Resume + Job
      ↓
Run AI Analysis
      ↓
Review Match Score
      ↓
Review Skills, Strengths, Weaknesses
      ↓
Review Recommendations
```

The current application is intentionally focused on the **job-seeker use case**.

A separate recruiter/ATS application may be developed in the future, but it is not part of the current project scope.

## 🏗️ Architecture

The current architecture follows a layered full-stack design:

```text
┌─────────────────────────────┐
│        Next.js Frontend     │
└──────────────┬──────────────┘
               │ HTTP / REST
               ▼
┌─────────────────────────────┐
│       Express Backend       │
│                             │
│  Routes                     │
│     ↓                       │
│  Controllers                │
│     ↓                       │
│  Services                   │
│     ↓                       │
│  PostgreSQL / AI Services   │
└──────────┬──────────┬───────┘
           │          │
           ▼          ▼
     PostgreSQL    AI Providers
                    ├── Gemini
                    ├── OpenAI
                    └── Mock
```

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack React Query
- Zustand

### Backend

- Node.js
- TypeScript
- Express
- REST API
- Zod
- JWT
- bcrypt

### Database

- PostgreSQL

### AI

- Google Gemini
- OpenAI
- Structured AI responses
- Zod schema validation
- AI provider abstraction
- RAG _(planned)_
- Vector database _(planned)_
- AI agents _(planned)_

### Testing

- Jest
- Babel Jest

### DevOps

- Docker
- Docker Compose
- GitHub Actions _(planned)_

## 🔐 Current AI Analysis Flow

```text
Resume
   +
Job Description
   │
   ▼
AI Provider
   │
   ├── Gemini
   ├── OpenAI
   └── Mock
   │
   ▼
Structured Analysis
   │
   ├── Matched Skills
   ├── Missing Skills
   ├── Strengths
   ├── Weaknesses
   ├── Recommendations
   └── Score Breakdown
            │
            ▼
      Backend Score
            │
            ▼
        PostgreSQL
```

The application uses a shared AI service interface so that different AI providers can be exchanged without changing the core analysis business logic.

## 🎯 Project Goal

This project is being developed as a practical Fullstack AI Engineering project covering:

- Full-stack web development
- Backend architecture
- REST API design
- PostgreSQL
- Authentication and authorization
- LLM integration
- Structured AI outputs
- Prompt engineering
- AI evaluation
- RAG
- AI agents
- Testing
- Security
- Docker
- CI/CD

The goal is to build the project incrementally while applying production-oriented software engineering practices.

## 📌 Development Roadmap

```text
Phase 0   Architecture                 ✅
Phase 1   Project Setup                ✅
Phase 2   Backend                      ✅
Phase 3   Frontend                     ✅ Core implementation complete
Phase 4   LLM Integration              ✅
Phase 5   AI Job Analysis              ✅
Phase 6   RAG                          📋 Planned
Phase 7   AI Agent                     📋 Planned
Phase 8   Testing                      🔨 In Progress
Phase 9   Security                     📋 Planned
Phase 10  Docker                       📋 Planned
Phase 11  CI/CD                        📋 Planned
Phase 12  Portfolio                    📋 Planned
```

## 📈 Development Approach

The project is developed incrementally with small, focused Git commits.

Each milestone follows:

```text
Implement
   ↓
Typecheck / Test
   ↓
Review changes
   ↓
Commit
   ↓
Next milestone
```

This repository represents an active development project rather than a completed application.

# PROJECT_RULES.md
## Development Standards & Rules

- Use TypeScript for all code.
- Use shadcn/ui and Tailwind for all UI.
- No custom CSS unless absolutely necessary.
- Keep components modular and composable.
- Write clear, descriptive commit messages.
- Document new features and breaking changes in the README.
- Lint and format code before pushing.
- No direct changes to main without review (if collaborating).
- Keep dependencies up to date, but do not upgrade Tailwind to v4+ until shadcn/ui and Vite fully support it.
- Use Node.js v20 for best compatibility.
- Always implement proper error handling with user-friendly messages.
- Use environment variables for configuration (API URLs, secret keys).
- Ensure all API endpoints require authentication (except registration/login).
- Follow camelCase in frontend and snake_case in backend with proper data transformation.
- Implement automatic token refresh for better user experience.
- Test all authentication flows and error scenarios thoroughly.

## Project Context

### Project Overview
- **Project Name**: TodoApp
- **Description**: A full-stack todo application with user authentication, task management, and category organization
- **Tech Stack**:
  - **Frontend**: React 19.1.0, TypeScript 5.8.3, Vite 6.3.5, shadcn/ui, Tailwind CSS 3.4.17
  - **Backend**: Django 5.2.3, Django REST Framework, SimpleJWT
  - **Database**: SQLite (development)
  - **Authentication**: JWT tokens with refresh capability

### Current Architecture
**Directory Structure:**
```
todo-app/
├── client/                    # React Frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/           # shadcn/ui components  
│   │   │   └── LoginForm.tsx # Authentication form
│   │   ├── api/              # API client functions
│   │   │   └── todoApi.ts    # Todo API integration
│   │   ├── lib/              # Utility functions
│   │   │   └── utils.ts      # Shared utilities
│   │   └── assets/           # Static assets
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.ts        # Vite configuration
│   ├── tailwind.config.js    # Tailwind configuration
│   └── tsconfig.json         # TypeScript configuration
├── server/                   # Django Backend
│   ├── server/               # Django project settings
│   │   ├── settings.py       # Main Django configuration
│   │   ├── urls.py           # URL routing + SPA catch-all
│   │   └── static/           # Served React build files
│   ├── todos/                # Django app
│   │   ├── models.py         # User, Todo, Category models
│   │   ├── serializers.py    # DRF serializers
│   │   ├── views.py          # API endpoints
│   │   └── urls.py           # App URL routing
│   ├── manage.py             # Django management
│   └── db.sqlite3            # SQLite database
└── venv/                     # Python virtual environment
```

**Key Files:**
- `client/src/api/todoApi.ts` - API client with JWT token handling
- `server/todos/models.py` - Database models for Todo and Category
- `server/server/settings.py` - Django configuration with CORS and JWT setup
- `server/server/urls.py` - URL routing with React SPA catch-all

## Current Status

### ✅ Completed:
- User authentication system with JWT tokens
- User registration and login forms with responsive design
- Todo CRUD operations (Create, Read, Update, Delete)
- Category management system
- Priority levels (low, medium, high) for todos
- Due date tracking
- User data isolation (users only see their own todos)
- Automatic token refresh implementation
- Django static file serving for React build
- shadcn/ui component integration
- Responsive UI with Tailwind CSS
- API endpoints with proper authentication
- Database models and migrations

### 🚧 In Progress:
- Frontend build fixes and deployment optimization

### 📋 Planned:
- Search and filtering functionality
- Todo sorting and organization features
- Email notifications for due dates
- Dark mode support
- Performance optimizations

### ⚠️ Known Issues:
- None currently documented

## Important Decisions & Context

### Authentication Flow:
- JWT-based authentication using SimpleJWT
- Access tokens (short-lived) + Refresh tokens (long-lived)
- Automatic token refresh on API calls
- Secure token storage in localStorage
- Login/Register forms with proper error handling

### API Design:
- RESTful API with Django REST Framework
- ViewSet-based architecture for CRUD operations
- Token-based authentication for all protected endpoints
- CORS configured for development (localhost:3000, localhost:5173)
- JSON serialization with proper error responses

### State Management:
- React useState for local component state
- JWT tokens managed in localStorage
- API client handles token refresh automatically
- Form state managed locally in components

### Environment Configuration:

**Development Setup:**

Frontend (from `/client` directory):
```bash
npm install
npm run dev    # Runs on http://localhost:5173
```

Backend (from `/server` directory):
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
python manage.py migrate
python manage.py runserver  # Runs on http://localhost:8000
```

**Production:** 
- Django serves React build from `/server/server/static/`
- React build deployed via `npm run build` in client directory
- Django configured to serve SPA with catch-all routing

## Quick Reference

### Common Commands:

**Frontend:**
```bash
cd client/
npm run dev          # Start development server
npm run build        # Build for production  
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

**Backend:**
```bash
cd server/
source venv/bin/activate
python manage.py runserver      # Start Django dev server
python manage.py migrate        # Run database migrations
python manage.py createsuperuser # Create admin user
python manage.py collectstatic   # Collect static files
```

### Key Patterns Used:
- shadcn/ui components with Tailwind CSS styling
- React functional components with TypeScript
- Django REST Framework ViewSets for API endpoints
- JWT token authentication with automatic refresh
- Environment variables for configuration
- Responsive design with mobile-first approach

### API Endpoints:
- `POST /api/register/` - User registration
- `POST /api/token/` - Login (get JWT tokens)
- `POST /api/token/refresh/` - Refresh access token
- `GET|POST /api/todos/` - List/Create todos
- `GET|PUT|DELETE /api/todos/{id}/` - Todo operations
- `GET|POST /api/categories/` - List/Create categories
- `GET|PUT|DELETE /api/categories/{id}/` - Category operations

### Environment Variables:
- `VITE_API_BASE_URL` - Frontend API base URL (default: http://localhost:8000/api/)
- `DJANGO_SECRET_KEY` - Django secret key for production

## Update Log
- **Last Updated:** July 1, 2025
- **By:** Claude Code
- **Changes:** Complete project documentation update with current architecture, tech stack, setup instructions, and development workflow
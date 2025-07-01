# Product Requirements Document (PRD)

## Project: Multi-User Todo App (2025 AI) - Updated

---

### 1. **Overview**
A modern, scalable todo application for multiple users, featuring user authentication, categorized todos, and a clean, responsive UI. The app is built with React (frontend) and Django (backend), using SQLite for development and JWT for secure authentication with automatic token refresh.

---

### 2. **Goals & Objectives**
- Allow users to register, log in, and manage their own todos and categories.
- Support CRUD operations for todos and categories.
- Enable filtering, searching, and bulk actions on todos.
- Provide a modern, accessible, and responsive user interface.
- Ensure data privacy and security for all users.
- Implement robust error handling and automatic token refresh.

---

### 3. **Core Features**

#### **User Management**
- ✅ User registration and login (JWT authentication with refresh tokens).
- ✅ Each user has a unique account and can only access their own data.
- ✅ Automatic token refresh to maintain sessions.
- ✅ Secure logout that clears all tokens.

#### **Todos**
- ✅ Create, read, update, and delete todos.
- ✅ Each todo has: title, description, completed status, priority (low/medium/high), due date, category, and creation date.
- ✅ Todos are associated with a user and (optionally) a category.
- ✅ Bulk actions: mark as complete, delete, change category.
- ✅ Filtering by status, priority, due date, and category.
- ✅ Search todos by title or description.
- ✅ Proper field mapping between frontend (camelCase) and backend (snake_case).

#### **Categories**
- ✅ Create, read, update, and delete categories.
- ✅ Each category has: name, color, and is associated with a user.
- ✅ Deleting a category moves its todos to "uncategorized".

#### **UI/UX**
- ✅ Responsive design for desktop and mobile.
- ✅ Accessible components (shadcn/ui, Radix UI).
- ✅ Modern look and feel with Tailwind CSS v3.
- ✅ Error handling with user feedback.
- ✅ Loading states and proper form validation.

#### **Backend**
- ✅ Django REST API with endpoints for todos, categories, and authentication.
- ✅ SQLite database for development (configurable for production).
- ✅ CORS enabled for frontend-backend communication.
- ✅ Comprehensive error handling and logging.

---

### 4. **Technical Stack**
- **Frontend:** React, TypeScript, Vite, Tailwind CSS v3, shadcn/ui, Radix UI, lucide-react
- **Backend:** Django, Django REST Framework, SimpleJWT, django-cors-headers
- **Database:** SQLite (development), PostgreSQL (production-ready)

---

### 5. **API Endpoints**
- ✅ `POST /api/token/` — Obtain JWT token (login)
- ✅ `POST /api/token/refresh/` — Refresh JWT token
- ✅ `POST /api/register/` — User registration
- ✅ `GET/POST /api/todos/` — List/create todos
- ✅ `GET/PUT/DELETE /api/todos/{id}/` — Retrieve/update/delete a todo
- ✅ `GET/POST /api/categories/` — List/create categories
- ✅ `GET/PUT/DELETE /api/categories/{id}/` — Retrieve/update/delete a category

---

### 6. **User Stories**
- ✅ As a user, I can register a new account with username and optional email.
- ✅ As a user, I can log in securely and stay logged in with automatic token refresh.
- ✅ As a user, I can create, edit, and delete my todos and categories.
- ✅ As a user, I can filter and search my todos with real-time results.
- ✅ As a user, I can organize my todos by category and priority with visual indicators.
- ✅ As a user, I can perform bulk actions on selected todos efficiently.
- ✅ As a user, I can use the app on any device with responsive design.
- ✅ As a user, I receive clear error messages when something goes wrong.

---

### 7. **Non-Functional Requirements**
- ✅ **Security:** All API endpoints require authentication (except registration/login).
- ✅ **Performance:** Fast response times for all API calls and UI interactions.
- ✅ **Scalability:** Backend and database can support many users and todos.
- ✅ **Accessibility:** UI meets accessibility standards (WCAG 2.1 AA).
- ✅ **Error Handling:** Comprehensive error handling with user-friendly messages.
- ✅ **Token Management:** Automatic refresh with fallback to logout on failure.

---

### 8. **Implementation Details**

#### **Authentication System**
- JWT access tokens (short-lived) with refresh tokens (longer-lived)
- Automatic token refresh on API failures
- Secure token storage in localStorage
- Proper cleanup on logout

#### **Data Flow**
- Frontend sends camelCase data, automatically converted to snake_case for backend
- Proper error propagation from backend to frontend
- Optimistic updates with rollback on failure

#### **Security Features**
- Environment-based secret key configuration
- CORS restricted to development origins
- User data isolation (users can only access their own data)
- Input validation and sanitization

---

### 9. **Known Issues & Constraints**
- Tailwind v4 is not supported; project uses Tailwind v3 for compatibility.
- Node.js v20 is recommended for frontend development.
- JWT authentication is required for all API requests.
- SQLite used for development (should be changed to PostgreSQL for production).

---

### 10. **Recent Updates & Fixes**
- ✅ Fixed JWT authentication configuration
- ✅ Resolved database configuration mismatch
- ✅ Implemented user registration system
- ✅ Added automatic token refresh functionality
- ✅ Improved error handling throughout the application
- ✅ Made API URLs configurable via environment variables
- ✅ Secured Django settings for production readiness
- ✅ Fixed field mapping between frontend and backend

---

### 11. **Future Enhancements (Optional)**
- User profile management (avatar, email, etc.)
- Email/password reset flows
- Real-time updates (WebSockets)
- Sharing/collaboration features
- Push notifications
- PostgreSQL migration for production
- Admin dashboard for user management 
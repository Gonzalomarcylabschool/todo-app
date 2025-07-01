# Product Requirements Document (PRD)

## Project: Multi-User Todo App (2025 AI)

---

### 1. **Overview**
A modern, scalable todo application for multiple users, featuring user authentication, categorized todos, and a clean, responsive UI. The app is built with React (frontend) and Django (backend), using PostgreSQL for persistent storage and JWT for secure authentication.

---

### 2. **Goals & Objectives**
- Allow users to register, log in, and manage their own todos and categories.
- Support CRUD operations for todos and categories.
- Enable filtering, searching, and bulk actions on todos.
- Provide a modern, accessible, and responsive user interface.
- Ensure data privacy and security for all users.

---

### 3. **Core Features**

#### **User Management**
- User registration and login (JWT authentication).
- Each user has a unique account and can only access their own data.

#### **Todos**
- Create, read, update, and delete todos.
- Each todo has: title, description, completed status, priority (low/medium/high), due date, category, and creation date.
- Todos are associated with a user and (optionally) a category.
- Bulk actions: mark as complete, delete, change category.
- Filtering by status, priority, due date, and category.
- Search todos by title or description.

#### **Categories**
- Create, read, update, and delete categories.
- Each category has: name, color, and is associated with a user.
- Deleting a category moves its todos to "uncategorized".

#### **UI/UX**
- Responsive design for desktop and mobile.
- Accessible components (shadcn/ui, Radix UI).
- Modern look and feel with Tailwind CSS.

#### **Backend**
- Django REST API with endpoints for todos, categories, and authentication.
- PostgreSQL database for persistent, scalable storage.
- CORS enabled for frontend-backend communication.

---

### 4. **Technical Stack**
- **Frontend:** React, TypeScript, Vite, Tailwind CSS v3, shadcn/ui, Radix UI, lucide-react
- **Backend:** Django, Django REST Framework, SimpleJWT, django-cors-headers
- **Database:** PostgreSQL

---

### 5. **API Endpoints**
- `POST /api/token/` — Obtain JWT token (login)
- `POST /api/token/refresh/` — Refresh JWT token
- `GET/POST /api/todos/` — List/create todos
- `GET/PUT/DELETE /api/todos/{id}/` — Retrieve/update/delete a todo
- `GET/POST /api/categories/` — List/create categories
- `GET/PUT/DELETE /api/categories/{id}/` — Retrieve/update/delete a category

---

### 6. **User Stories**
- As a user, I can register and log in securely.
- As a user, I can create, edit, and delete my todos and categories.
- As a user, I can filter and search my todos.
- As a user, I can organize my todos by category and priority.
- As a user, I can perform bulk actions on selected todos.
- As a user, I can use the app on any device.

---

### 7. **Non-Functional Requirements**
- **Security:** All API endpoints require authentication (except registration/login).
- **Performance:** Fast response times for all API calls and UI interactions.
- **Scalability:** Backend and database can support many users and todos.
- **Accessibility:** UI meets accessibility standards (WCAG 2.1 AA).

---

### 8. **Known Issues & Constraints**
- Tailwind v4 is not supported; project uses Tailwind v3 for compatibility.
- Node.js v20 is recommended for frontend development.
- JWT authentication is required for all API requests.

---

### 9. **Future Enhancements (Optional)**
- User profile management (avatar, email, etc.)
- Email/password reset flows
- Real-time updates (WebSockets)
- Sharing/collaboration features
- Push notifications 
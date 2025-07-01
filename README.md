# Multi-User Todo App (2025 AI)

A modern, full-stack todo application with user authentication, categorized todos, and real-time features. Built with React + TypeScript frontend and Django REST API backend.

## ✨ Features

### 🔐 Authentication & Security
- User registration and login system
- JWT authentication with automatic token refresh
- Secure user data isolation
- Environment-based configuration for production

### 📝 Todo Management
- Create, edit, delete, and mark todos as complete
- Organize todos with custom categories (with colors)
- Set priority levels (low, medium, high) with visual indicators
- Due date tracking with overdue notifications
- Full-text search across titles and descriptions
- Advanced filtering by status, priority, category, and due date

### 🎯 Bulk Operations
- Select multiple todos for batch operations
- Bulk mark as complete, delete, or change categories
- Efficient UI for managing large todo lists

### 🎨 Modern UI/UX
- Responsive design for desktop and mobile
- Clean, modern interface with Tailwind CSS
- Accessible components using shadcn/ui and Radix UI
- Real-time updates and feedback
- Loading states and error handling

## 🛠 Technical Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS v3** for styling
- **shadcn/ui** + **Radix UI** for accessible components
- **Lucide React** for icons

### Backend
- **Django 5.2** with Django REST Framework
- **SimpleJWT** for JWT authentication
- **SQLite** (development) / **PostgreSQL** (production)
- **CORS** enabled for frontend communication

## 🚀 Quick Start

### Prerequisites
- Node.js v20+
- Python 3.8+
- pip (Python package manager)

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
   ```

4. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the development server:**
   ```bash
   python manage.py runserver
   ```

The Django API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The React app will be available at `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/register/` - User registration
- `POST /api/token/` - Login (obtain JWT tokens)
- `POST /api/token/refresh/` - Refresh access token

### Todo Endpoints
- `GET /api/todos/` - List user's todos
- `POST /api/todos/` - Create new todo
- `GET /api/todos/{id}/` - Get specific todo
- `PUT /api/todos/{id}/` - Update todo
- `DELETE /api/todos/{id}/` - Delete todo

### Category Endpoints
- `GET /api/categories/` - List user's categories
- `POST /api/categories/` - Create new category
- `GET /api/categories/{id}/` - Get specific category
- `PUT /api/categories/{id}/` - Update category
- `DELETE /api/categories/{id}/` - Delete category

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the client directory for frontend configuration:
```env
VITE_API_BASE_URL=http://localhost:8000/api/
```

For production Django settings, set:
```env
DJANGO_SECRET_KEY=your-secret-key-here
```

### CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:3000` (Create React App)
- `http://localhost:5173` (Vite)
- `http://127.0.0.1:3000`
- `http://127.0.0.1:5173`

## 🔒 Security Features

- JWT access tokens with refresh token rotation
- User data isolation (users can only access their own data)
- CORS protection
- Input validation and sanitization
- Secure password handling
- Environment-based secret management

## 🐛 Error Handling

The application includes comprehensive error handling:
- Automatic token refresh on authentication failures
- User-friendly error messages
- Graceful fallbacks for network issues
- Proper loading and error states in the UI

## 🏗 Project Structure

```
todo-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api/           # API client functions
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
├── server/                # Django backend
│   ├── server/            # Django project settings
│   ├── todos/             # Django app
│   ├── manage.py
│   └── requirements.txt
├── PRD.md                 # Product Requirements Document
├── rules.md               # Development rules
└── README.md              # This file
```

## 🚀 Recent Updates

- ✅ Fixed JWT authentication configuration
- ✅ Added user registration system
- ✅ Implemented automatic token refresh
- ✅ Improved error handling throughout the app
- ✅ Made API URLs configurable
- ✅ Fixed field mapping between frontend/backend
- ✅ Secured Django settings for production

## 📝 Development Rules

- Use TypeScript for all frontend code
- Use shadcn/ui and Tailwind for all UI components
- Keep components modular and composable
- Write clear, descriptive commit messages
- Lint and format code before committing
- No custom CSS unless absolutely necessary

## 🔮 Future Enhancements

- Email/password reset flows
- Real-time updates with WebSockets
- User profile management
- Sharing and collaboration features
- Push notifications
- PostgreSQL migration for production
- Admin dashboard

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.
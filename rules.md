# Project Rules

1. **Use TypeScript for all code.**
2. **Use shadcn/ui and Tailwind for all UI.**  
   No custom CSS unless absolutely necessary.
3. **Keep components modular and composable.**
4. **Write clear, descriptive commit messages.**
5. **Document new features and breaking changes in the README.**
6. **Lint and format code before pushing.**
7. **No direct changes to `main` without review (if collaborating).**
8. **Keep dependencies up to date, but do not upgrade Tailwind to v4+ until shadcn/ui and Vite fully support it.**
9. **Use Node.js v20 for best compatibility.**
10. **Always implement proper error handling with user-friendly messages.**
11. **Use environment variables for configuration (API URLs, secret keys).**
12. **Ensure all API endpoints require authentication (except registration/login).**
13. **Follow camelCase in frontend and snake_case in backend with proper data transformation.**
14. **Implement automatic token refresh for better user experience.**
15. **Test all authentication flows and error scenarios thoroughly.** 
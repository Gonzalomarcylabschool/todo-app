# Todo App

A modern, full-featured todo app built with React, TypeScript, Vite, Tailwind CSS v3, and shadcn/ui.

## Tech Stack

- **React** (with TypeScript)
- **Vite** (for fast dev/build)
- **Tailwind CSS v3** (utility-first styling)
- **shadcn/ui** (accessible, composable UI components)
- **Radix UI** (for accessible primitives)
- **lucide-react** (icon set)

---

## Project Rules

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

---

## Getting Started

```sh
# Install dependencies
cd client
npm install

# Start the dev server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Known Issues

- **Tailwind v4 is not supported.**  
  This project uses Tailwind v3 for compatibility with shadcn/ui and Vite.
- **Node.js v20 is recommended.**  
  Newer Node versions may cause issues with Vite or Tailwind.

---

## Features

- Add, edit, delete, and filter todos
- Categorize todos
- Bulk actions
- Responsive, accessible UI

# Rainbow Academy — Frontend

Frontend for **Rainbow Academy**, a real-world English e-learning platform. The platform offers tiered English courses (A1 to C2), interactive learning activities, and a paid ebooks section.

## Features

- **Landing page** with course levels, activities showcase, and vocabulary preview
- **Course catalog** — A1 through C2 levels plus IELTS and Business English
- **Ebooks section** — paid digital content
- **Authentication flows** — login and registration pages
- **Student dashboard** and **admin panel** with role-based routing
- **Responsive design** with custom typography and gradient-based visual identity

## Tech Stack

|               |                                                  |
| ------------- | ------------------------------------------------ |
| Framework     | Next.js 16 (App Router)                          |
| Language      | TypeScript                                       |
| Styling       | Tailwind CSS v4                                  |
| UI Components | shadcn/ui + Radix UI                             |
| Icons         | Lucide React                                     |
| Fonts         | Playfair Display, DM Sans, Cinzel (Google Fonts) |

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   ├── (student)/dashboard/
│   │   └── (teacher)/admin/
│   ├── courses/
│   ├── ebooks/
│   ├── contact/
│   └── layout.tsx
├── components/
│   ├── layout/        # NavBar, Footer
│   └── foreigns/      # Launcher, Ebook
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Status

🚧 In progress — frontend complete. Backend (NestJS + PostgreSQL) in development.

# rainbow-academy-frontend
# rainbow-academy-frontend

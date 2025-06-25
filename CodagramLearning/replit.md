# Codagram - Coding Education Platform (Tutedude Clone)

## Overview

Codagram is a complete recreation of Tutedude.com - a full-stack EdTech platform offering comprehensive coding courses with placement assistance. Built with modern React frontend and Express.js backend, featuring user authentication, course enrollment, detailed curriculum, and email notifications. All courses are priced at ₹13,500 with complete syllabus and project details matching Tutedude's structure.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Pattern**: RESTful API design
- **Development Server**: Custom Vite integration for SSR-like development

### Project Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared types and schemas
├── migrations/      # Database migrations
└── dist/           # Production build output
```

## Key Components

### Database Schema (PostgreSQL)
- **users**: User authentication and profiles
- **courses**: Course catalog with pricing, features, and metadata
- **testimonials**: Student testimonials with ratings
- **contacts**: Contact form submissions with timestamps

### API Endpoints
- `GET /api/courses` - Retrieve all courses
- `GET /api/courses/:id` - Get specific course details
- `GET /api/testimonials` - Fetch testimonials
- `POST /api/contact` - Submit contact form

### Storage Layer
- **Interface-based Design**: IStorage interface for data operations
- **Memory Storage**: In-memory implementation with seeded data
- **Database Ready**: Configured for PostgreSQL through Drizzle ORM

### UI Components
- **Design System**: Custom Tailwind configuration with CSS variables
- **Component Library**: Comprehensive set of reusable UI components
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Accessibility**: Built on Radix UI for keyboard navigation and screen readers

## Data Flow

1. **Client Requests**: React components use TanStack Query hooks
2. **API Layer**: Express routes handle HTTP requests
3. **Data Layer**: Storage interface abstracts database operations
4. **Response**: JSON data returned to client for state updates
5. **UI Updates**: React Query manages cache invalidation and UI synchronization

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, React DOM
- **Routing**: Wouter
- **State Management**: TanStack React Query
- **Forms**: React Hook Form, Zod validation
- **UI Components**: Radix UI primitives, Shadcn/ui
- **Styling**: Tailwind CSS, class-variance-authority
- **Utilities**: Date-fns, Lucide React icons

### Backend Dependencies
- **Server**: Express.js
- **Database**: Drizzle ORM, Neon Database client
- **Development**: TSX for TypeScript execution
- **Build**: ESBuild for production bundling

### Development Tools
- **Build System**: Vite with React plugin
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint configuration (implicit)
- **Development Environment**: Replit integration with error overlay

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev` - Runs TSX server with hot reload
- **Port**: 5000 (configured in .replit)
- **Hot Reload**: Vite dev server with React Fast Refresh

### Production Build
- **Frontend**: Vite builds to `dist/public`
- **Backend**: ESBuild bundles server to `dist/index.js`
- **Deployment**: Configured for Replit autoscale deployment
- **Environment**: NODE_ENV-based configuration switching

### Database Configuration
- **Development**: Uses DATABASE_URL environment variable
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Serverless-compatible with connection pooling

## Recent Changes

✓ Complete website recreation like Tutedude.com with 8 comprehensive courses
✓ All course prices set to ₹13,500 as requested
✓ Full authentication system with Replit Auth integration
✓ Enhanced course detail pages with syllabus, projects, and outcomes
✓ Contact form and enrollment emails sent to shubhamkasarsrk@gmail.com
✓ User dashboard with enrollment tracking
✓ Responsive design matching modern EdTech platforms
✓ Free email logging service for notifications

## Changelog

- December 24, 2024: Complete Tutedude-like website implementation with authentication and email notifications

## User Preferences

Preferred communication style: Simple, everyday language.
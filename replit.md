# Overview

This is a modern Angular frontend application called "Fintcs Frontend" that serves as a web application built with Angular 20+ and styled using Tailwind CSS. The application features a clean, responsive design with a navigation system, home page showcasing features, and an about page detailing the technical stack. It's configured for development with TypeScript strict mode and includes custom utility classes for consistent UI components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Framework
The application uses Angular 20+ as the core frontend framework, leveraging the latest features and improvements. Angular was chosen for its robust ecosystem, TypeScript integration, and excellent tooling support through Angular CLI.

## Styling Architecture
Tailwind CSS 4+ is integrated as the primary styling solution, providing a utility-first approach to CSS. This choice enables rapid UI development with consistent design patterns. The styling architecture includes:
- PostCSS configuration for processing Tailwind directives
- Custom utility classes defined in the global styles
- Component-specific styling through Tailwind utilities
- Custom color palette with primary brand colors
- Responsive design with mobile-first approach

## Application Structure
The application follows Angular's recommended project structure with:
- Component-based architecture with separate home and about components
- Router-based navigation for single-page application behavior
- Modular organization with AppModule as the root module
- TypeScript strict mode enabled for enhanced code quality and type safety

## Build and Development
The build system is configured through Angular CLI with:
- Development server configured to run on port 5000 with host 0.0.0.0
- Production build optimizations including output hashing and bundle size limits
- TypeScript compilation with ES2022 target for modern browser support
- Source maps enabled for debugging

## Navigation and Routing
The application implements client-side routing with:
- Default route redirection to home page
- Wildcard route handling for unknown paths
- Active route highlighting in navigation
- Router outlet for component rendering

# External Dependencies

## Core Framework Dependencies
- **Angular Framework**: Complete Angular ecosystem including core, common, forms, router, and platform-browser packages
- **Angular CLI**: Development tools and build system for Angular applications
- **RxJS**: Reactive programming library for handling asynchronous operations
- **Zone.js**: Change detection mechanism for Angular applications

## Styling and CSS Processing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **PostCSS**: CSS transformation tool with autoprefixer plugin
- **Autoprefixer**: Automatically adds vendor prefixes to CSS rules

## Development Tools
- **TypeScript**: Typed superset of JavaScript for enhanced development experience
- **TSLib**: Runtime library for TypeScript helpers

The application currently operates as a standalone frontend without backend integrations, external APIs, or database connections. All functionality is client-side with static content and navigation.
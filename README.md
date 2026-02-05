<div align="center">
  <img src="https://media.licdn.com/dms/image/v2/C560BAQHzzaL_ARkaAg/company-logo_200_200/company-logo_200_200/0/1630662302519/fletchapi_logo?e=1772064000&v=beta&t=gzp7HX6vtnB_d2JS5ahJdQdWEyb8Is-FX-drdDIrm0Y" alt="Turborepo" width="200" />
</div>

# Turborepo + shadcn/ui v2 + Base UI + Tailwind CSS v4 + Next.js 16 + React 19

A modern monorepo template featuring the latest versions of popular tools and frameworks.

## Tech Stack

This template includes:

- **Turborepo** - High-performance build system for JavaScript and TypeScript codebases
- **shadcn/ui v2** - Beautifully designed components built with Base UI and Tailwind CSS
- **Base UI** - Unstyled, accessible React components as the foundation
- **Tailwind CSS v4** - Utility-first CSS framework with the latest features
- **Next.js 16** - React framework with App Router, Server Components, and Turbopack
- **React 19** - Latest React with improved performance and features
- **TypeScript** - Type-safe development
- **pnpm** - Fast, disk space efficient package manager

## Prerequisites

- Node.js >= 22
- pnpm >= 10.17.1

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

This will start the Next.js app with Turbopack enabled.

## Adding Components

To add shadcn/ui components to your UI package, run:

```bash
pnpm dlx shadcn@latest add button -c packages/ui
```

Components will be placed in `packages/ui/src/components` directory.

## Using Components

Import components from the shared UI package:

```tsx
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
```

## Project Structure

```
.
├── apps/
│   └── web/              # Next.js 16 application
├── packages/
│   ├── ui/               # Shared UI components (shadcn/ui v2)
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
└── package.json          # Root package.json with workspace configuration
```

## Key Features

- **Monorepo Architecture** - Shared packages for UI components and configurations
- **Base UI Components** - Accessible, unstyled primitives from Base UI
- **Tailwind CSS v4** - Modern CSS with improved performance and features
- **Next.js 16** - Latest Next.js with App Router and Server Components
- **React 19** - Latest React with compiler optimizations
- **TypeScript** - Full type safety across the monorepo
- **ESLint** - Shared linting configuration with Next.js 16 support

## More Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Base UI Documentation](https://base-ui.com)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)

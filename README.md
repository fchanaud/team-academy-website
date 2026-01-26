# Tennis Academy Marrakech Website

A modern, responsive React application rebuilding the Tennis Academy Marrakech website with internationalization support.

## Features

- 🌍 **Internationalization**: English and French support with URL-based routing (`/en/*`, `/fr/*`)
- 📱 **Mobile-First**: Fully responsive design optimized for all screen sizes
- ⚡ **Performance**: Built with Vite for fast development and optimized builds
- 🎨 **Modern UI**: Clean, premium design using Tailwind CSS and shadcn/ui components
- 🔍 **SEO Optimized**: Meta tags, structured data (JSON-LD), and proper canonical URLs
- ♿ **Accessible**: Built with accessibility best practices

## Tech Stack

- React 18.3+ with TypeScript
- Vite 5.4+
- React Router DOM 6.30+
- Tailwind CSS 3.4+
- shadcn/ui (Radix UI primitives)
- i18next + react-i18next
- TanStack React Query
- react-helmet-async
- React Hook Form + Zod

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── sections/        # Reusable section components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── CampBanner.tsx
│   └── WhatsAppWidget.tsx
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── i18n/                # Internationalization setup
│   └── locales/         # Translation files
├── lib/                 # Utility functions
├── App.tsx              # Main app component with routing
└── main.tsx             # Entry point
```

## Deployment

This application is ready to deploy on Vercel. The build output will be in the `dist` directory after running `npm run build`.

## License

Private project - All rights reserved

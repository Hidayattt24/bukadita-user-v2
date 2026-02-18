# Bukadita User v2

Welcome to the **Bukadita User v2** repository. This is a modern, high-performance web application built with **Next.js 15**, designed to provide an interactive learning experince with features like quizzes, modules, and progress tracking. It is optimized as a **Progressive Web App (PWA)** for seamless offline usage.

## 🚀 Tech Stack

This project leverages the latest web technologies for best performance and developer experience:

### Core Framework
- **[Next.js 15](https://nextjs.org/)**: React framework with App Router, Server Components, and Turbopack.
- **[React 19](https://react.dev/)**: The latest version of React for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: Strong typing for better maintainability and developer tooling.

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
- **[shadcn/ui](https://ui.shadcn.com/)**: Reusable components built with Radix UI and Tailwind CSS.
- **[Framer Motion](https://www.framer.com/motion/)** & **[Tw Animate CSS](https://github.com/theamigo/tw-animate-css)**: For smooth animations and transitions.
- **[Lucide React](https://lucide.dev/)** & **[React Icons](https://react-icons.github.io/react-icons/)**: Comprehensive icon libraries.

### State Management & Data
- **[TanStack Query v5](https://tanstack.com/query/latest)**: Powerful asynchronous state management for data fetching.
- **[Supabase](https://supabase.com/)**: Open source Firebase alternative for Backend, Database, and Authentication.

### Features & Integrations
- **PWA (Progressive Web App)**: Powered by `next-pwa` with custom caching strategies for offline support (Images, APIs, Static Assets).
- **Maps**: Interactive maps using **[Leaflet](https://leafletjs.com/)** and **[React Leaflet](https://react-leaflet.js.org/)**.
- **PDF Generation**: Client-side PDF generation using **[jspdf](https://github.com/parallax/jsPDF)** and **[jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable)**.
- **Markdown Rendering**: Rich text formatting with **[react-markdown](https://github.com/remarkjs/react-markdown)**, `rehype-highlight`, and `remark-gfm`.

## 🔋 Key Features

- **Offline-First Experience**: Aggressive caching strategies ensure the app works reliably even with unstable internet connections.
- **Interactive Quizzes**: dedicated modules for taking quizzes and tracking attempts.
- **Learning Materials**: Access to modules and educational content.
- **User Progress**: Tracking user achievements and progress.
- **Secure**: Strict Content Security Policies and headers configured for production.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v20 or newer recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bukadita-user-v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Copy `.env.example` to `.env` and fill in the required Supabase credentials.
   ```bash
   cp .env.example .env
   ```

### Development

Run the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

### PWA Asset Generation

To generate icons and screenshots for the PWA manifest:

```bash
npm run generate-icons
npm run generate-screenshots
# Or build everything together
npm run pwa:build
```

## 📂 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components (including shadcn/ui).
- `src/lib`: Utility functions and libraries.
- `src/hooks`: Custom React hooks.
- `src/services`: API service layers.
- `public`: Static assets (images, icons, manifest).

## ☁️ Deployment

This project is optimized for deployment on **Vercel**.

For a detailed step-by-step deployment guide, please refer to **[VERCEL_DEPLOY_GUIDE.md](./VERCEL_DEPLOY_GUIDE.md)** included in this repository.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

[MIT](LICENSE)

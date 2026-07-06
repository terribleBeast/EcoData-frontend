# EcoData Frontend

Frontend application for **EcoData**, a web system for collecting, viewing, and analyzing ecological plant data. The frontend provides pages for authentication, researchers, researches, plants, locations, and an image analyzer workflow for classifying leaf images and preparing results for research records.

## Main features

- User authentication and profile-related UI.
- Research, researcher, plant, location, organization, and laboratory pages.
- Analyzer page for uploading plant/leaf images.
- Genus selection and display of species with available classification models.
- WebSocket-based batch image classification.
- Local creation of leaf cards from classification results.
- Full-info dialogs for images and leaves.
- Material UI based interface with shared layout components.

## Tech stack

- **React**
- **TypeScript**
- **Vite**
- **Material UI**
- **Redux Toolkit / RTK Query**
- **React Router**
- **React Dropzone**

## Repository structure

```text
.
├── public/                  # Static assets
├── scripts/                 # Mock/database helper scripts
├── src/
│   ├── api/                 # API configuration and RTK Query endpoints
│   ├── app/                 # Store and app-level setup
│   ├── features/            # Feature modules: analyzer, plants, researches, etc.
│   ├── shared/              # Shared UI, types, utilities, layout components
│   └── main.tsx             # Application entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Requirements

- Node.js 20+ recommended
- npm
- Running EcoData backend, usually at `http://localhost:8000/api/v1`

## Installation

```bash
git clone https://github.com/terribleBeast/EcoData-frontend.git
cd EcoData-frontend
npm install
```

## Running locally

```bash
npm run dev
```

The Vite dev server usually starts at:

```text
http://localhost:5173
```

## Available scripts

```bash
npm run dev            # Start Vite development server
npm run lint           # Run ESLint
npm run preview        # Preview Vite build output
npm run mock:generate  # Generate mock data
npm run mock:server    # Start mock server
```


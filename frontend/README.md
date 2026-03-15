# Forecast Monitoring Frontend

A modern web application for visualizing wind forecast data using React and Recharts.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Visualization**: Recharts
- **Date Picking**: React Datepicker
- **HTTP Client**: Axios
- **Styling**: Vanilla CSS / CSS Modules
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm

### Installation

```bash
cd frontend
pnpm install
```

### Running the Application

To start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

```bash
pnpm build
```

## Features

- Dynamic visualization of wind forecast trends.
- Date range filtering for historical and forecast analysis.
- Responsive design for various screen sizes.

## Project Structure

- `src/components/`: Reusable UI components (e.g., `ForecastChart.tsx`).
- `src/hooks/`: Custom React hooks.
- `src/services/`: API integration logic.
- `src/utils/`: Helper functions and formatting.
- `public/`: Static assets.

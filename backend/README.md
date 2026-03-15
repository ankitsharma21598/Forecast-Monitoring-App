# Forecast Monitoring Backend

This is the backend service for the Forecast Monitoring App. It provides an API to fetch and manage wind forecast data.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Date Handling**: Day.js
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm

### Installation

```bash
cd backend
pnpm install
```

### Running the Application

To start the development server with hot-reload:

```bash
pnpm start
```

The server will be available at `http://localhost:8000`.

## API Endpoints

- `GET /api/wind`: Fetches wind forecast data.
- `GET /`: Health check (returns "Hello World!").

## Project Structure

- `src/server.ts`: Entry point of the application.
- `src/routes/`: API route definitions.
- `src/controllers/`: Logic for handling requests.
- `src/services/`: External API integrations or business logic.
- `src/utils/`: Utility functions.
- `src/types/`: TypeScript interfaces and types.

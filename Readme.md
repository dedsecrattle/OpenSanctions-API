# OpenSanctions API

A fullstack application that provides a user-friendly interface to search the Office of Foreign Assets Control (OFAC) sanctions lists, powered by the OpenSanctions API.

## Overview

This project consists of two main components:
- **Backend**: Node.js/Express API server that serves as a proxy to the OpenSanctions API
- **Frontend**: React application with a modern UI built with TypeScript, Vite, and TailwindCSS

## Setup and Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenSanctions API key ([Get one here](https://www.opensanctions.org/api/))

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file based on the sample:
   ```bash
   cp .env.sample .env
   ```

4. Add your OpenSanctions API key to the .env file:
   ```
   OPENSANCTIONS_API_KEY="your_api_key_here"
   CACHE_TTL=600
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on port 5000 (or the port specified in the `PORT` environment variable).

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173)

## Building for Production

### Backend

```bash
cd server
npm install --production
```

Then use a process manager like PM2 to run the server in production.

### Frontend

```bash
cd client
npm run build
```

This will generate a `dist` directory with optimized static files that can be deployed to any static hosting service.

## Technical Documentation

### Architecture

The application follows a client-server architecture:

1. **Frontend**: React SPA that communicates with the backend API
2. **Backend**: Express.js server that proxies requests to the OpenSanctions API

### Backend Technologies

- **Node.js**: JavaScript runtime
- **Express**: Web server framework
- **Axios**: HTTP client for API requests
- **Node-Cache**: In-memory caching to reduce API calls
- **Dotenv**: Environment variable management

#### API Endpoints

- `GET /api/sanctions/search`: Search sanctions
  - Query parameters:
    - `query`: The search term (required)
    - `type`: Filter by entity type (`all`, `individuals`, `entities`)
    - `limit`: Number of results per page (default: 10)
    - `offset`: Pagination offset (default: 0)

#### Caching Strategy

The backend implements a caching mechanism using `node-cache` to reduce the number of calls to the OpenSanctions API and improve performance:

- Cache TTL (Time To Live) is configurable via the `CACHE_TTL` environment variable (default: 600 seconds)
- Cache keys are generated based on search parameters (query, type, limit, offset)

### Frontend Technologies

- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **React Query**: Data fetching and state management
- **Heroicons**: SVG icon collection
- **Axios**: HTTP client

#### Key Components

1. **App**: Main application component that manages state and renders the UI
2. **SearchBar**: Handles search input and filters
3. **ResultsList**: Displays search results
4. **Pagination**: Handles pagination of results

#### State Management

- React Query is used for server state management (caching, refetching)
- React's useState for UI state (search query, filters, pagination)

#### Features

- Responsive design that works on mobile and desktop
- Dark/light mode toggle
- Pagination for large result sets
- Filter by entity type (individuals/organizations)
- Caching of search results

## License

This project is licensed under the MIT License.